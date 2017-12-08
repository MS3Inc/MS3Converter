import OasLoaderInterface from './oas-loader-interface';
import { API } from './../ms3/ms3-v1-api-interface';
import LoaderInterface from './../common/loader-interface';
import * as fs from 'fs';
import * as util from 'util';
import * as unzip from 'unzip';
import { oas30Interface, oas20Interface } from '../oas/index';
import * as YAML from 'yamljs';
import { findLastIndex } from 'lodash';
import Finder from 'node-find-files2';
import * as rmdir from 'rmdir';

const rmdirPromise = util.promisify(rmdir);
const readFilePromise = util.promisify(fs.readFile);

export default class OasLoader implements LoaderInterface {
  constructor(private path: string = '') {
    if (!path) throw new Error('Empty path');
  }

  private parseZip(): Promise<OasLoaderInterface> {
    return new Promise( (resolve, reject) => {
      const readStream = fs.createReadStream(this.path);
      const unzipExtractor = unzip.Extract({ path: './.temp' });
      readStream.pipe(unzipExtractor);
      unzipExtractor.on('close', () => {
        this.findApiFile()
          .then((api) => {
            resolve(api);
          })
          .catch(function(error) {
            rmdirPromise('./.temp');
            reject(error);
          });
      });
    });
  }

  private async findApiFile (): Promise<OasLoaderInterface> {
    function fileFind(search: string) {
      return new Finder({
        rootFolder : './.temp',
        filterFunction : (path: string, stat: any) => {
          const isMatch = (path.substring(path.length - 8) == search) ? true : false;
          const isMacFile = path.split('/').filter((str: string): Boolean => {
            return str == '__MACOSX';
          }, this);
          return (isMatch && !isMacFile.length) ? path : '';
        }
      });
    }

    function findCustomName(search: string) {
      return new Finder({
        rootFolder : './.temp',
        filterFunction : (path: string, stat: any) => {
          const reg = new RegExp(search, 'g');
          const isMatch = (path.search(reg) > 0) ? true : false;
          const isMacFile = path.split('/').filter((str: string): Boolean => {
            return str == '__MACOSX';
          }, this);
          return (isMatch && !isMacFile.length) ? path : '';
        }
      });
    }
    const yamlFile = await fileFind('api.yaml').startSearch();
    let jsonFile;
    if (yamlFile && yamlFile.length) {
      const path = yamlFile[0].path;
      const result: OasLoaderInterface = {};
      result.api = YAML.load(path);
      result.definitions = await this.getSwaggerDefinitions(result.api);
      await rmdirPromise('./.temp');
      return result;
    } else {
      jsonFile = await fileFind('api.json').startSearch();
      if (jsonFile && jsonFile.length) {
        const path = jsonFile[0].path;
        const result: OasLoaderInterface = {};
        result.api = await readFilePromise(path, 'utf-8');
        result.definitions = await this.getSwaggerDefinitions(result.api);
        await rmdirPromise('./.temp');
        return result;
      }
    }

    function isSwaggerFile(content: String) {
      const reg = /swagger":/g;
      return content.search(reg) == 0 ? true : false;
    }

    if (!yamlFile.length && !jsonFile.length) {
      const fileInYamlFormat = await findCustomName('.yaml').startSearch();
      const result: OasLoaderInterface = {};
      if (fileInYamlFormat.length) {
        for (const file of fileInYamlFormat) {
          const isSwagger = isSwaggerFile(JSON.stringify(YAML.load(file.path)));
          if (isSwagger) {
            result.api = YAML.load(file.path);
            result.definitions = await this.getSwaggerDefinitions(result.api);
          }
        }
        if (result.api) return result;
      }

      const fileInJsonFormat = await findCustomName('.json').startSearch();
      if (fileInJsonFormat.length) {
        for (const file of fileInJsonFormat) {
          const content = await readFilePromise(file.path, 'utf-8');
          const isSwagger = isSwaggerFile(content);
          if (isSwagger) {
            result.api = content;
            result.definitions = await this.getSwaggerDefinitions(result.api);
          }
        }
        if (result.api) return result;
      }
    }
    await rmdirPromise('./.temp');
  }

  private async getSwaggerDefinitions(api: Object): Promise<Object[]> {
    const stringApi = JSON.stringify(api);
    const reg = /\$ref\"\:\"[^#](.[^"}]+)\#/g;
    const externalPaths = stringApi.match(reg);
    if (externalPaths) {
      const arr = externalPaths.map(async (path) => {
        const parsedPath = path.slice(8, path.length - 1);
        let name = parsedPath.split('/')[parsedPath.split('/').length - 1];
        name = name.slice(0, findLastIndex(name, (item) => item == '.'));
        let content;
        try {
          content = await readFilePromise(`./.temp${parsedPath}`, 'utf-8');
        } catch (error) {
          throw new Error(`Error reading file: ${error.message}`);
        }
        return { name, content };
      });

      return Promise.all(arr);
    }
    return Promise.resolve([]);
  }

  private async parseJson(): Promise<oas30Interface.API | oas20Interface.API> {
    let fileContent;
    try {
      fileContent = await readFilePromise(this.path, 'utf-8');
      fileContent = JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Error reading OAS file: ${error.message}`);
    }
    return fileContent;
  }

  async load(): Promise<OasLoaderInterface> {
    let result: OasLoaderInterface = {};
    const file = this.path.split('/')[this.path.split('/').length - 1];
    const fileExtension = file.split('.')[file.split('.').length - 1];
    switch (fileExtension) {
      case 'yaml':
        result.api = YAML.load(this.path);
        break;
      case 'json':
        result.api = await this.parseJson();
        break;
      case 'zip':
        result = await this.parseZip();
        break;
      default:
        throw new Error(`Wrong format: ${fileExtension}`);
    }

    return result;
  }

  static create(path: string) {
    return new OasLoader(path);
  }
}
