import OasLoaderInterface from './oas-loader-interface';
import { API } from './../ms3/ms3-v1-api-interface';
import LoaderInterface from './../common/loader-interface';
import * as fs from 'fs';
import * as fsPath from 'path';
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
            rmdirPromise('./.temp');
            resolve(api);
          })
          .catch(function(error) {
            rmdirPromise('./.temp');
            reject(error);
          });
      });
    });
  }

  private findFileBy(nameWithExtension: string, extension: string = null) {
    return new Finder({
      rootFolder : './.temp',
      filterFunction : (path: string, stat: any) => {
        let isMatch = false;

        if (nameWithExtension) {
          isMatch = (fsPath.basename(path) == nameWithExtension) ? true : false;
        } else if (extension) {
          isMatch = (fsPath.extname(path) == extension) ? true : false;
        }

        const isMacFile = path.split('/').filter((str: string): Boolean => {
          return str == '__MACOSX';
        }, this);
        return (isMatch && !isMacFile.length) ? path : '';
      }
    });
  }

  private loadYamlPromise(path: string) {
    return new Promise((resolve, reject) => {
      YAML.load(path, (data: string) => {
        if (!data) return reject(`Cannot parse yaml at: ${path}`);
        return resolve(data);
      });
    });
  }

  private isSwaggerApiFile(content: string) {
    const reg = /(swagger\":|openapi\":|swagger:|openapi:)/g;
    return content.search(reg) !== -1 ? true : false;
  }

  private async findApiFile (): Promise<OasLoaderInterface> {
    const yamlFile = await this.findFileBy('api.yaml').startSearch();
    let jsonFile;
    if (yamlFile && yamlFile.length) {
      const path = yamlFile[0].path;
      const result: OasLoaderInterface = {};
      result.api = await this.loadYamlPromise(path);
      result.definitions = await this.getSwaggerDefinitions(result.api);
      result.examples = await this.getSwaggerExamples(result.api);
      return result;
    } else {
      jsonFile = await this.findFileBy('api.json').startSearch();
      if (jsonFile && jsonFile.length) {
        const path = jsonFile[0].path;
        const result: OasLoaderInterface = {};
        result.api = await readFilePromise(path, 'utf-8');
        result.definitions = await this.getSwaggerDefinitions(result.api);
        result.examples = await this.getSwaggerExamples(result.api);
        return result;
      }
    }

    return await this.guessApiFile();
  }

  private async guessApiFile(): Promise<OasLoaderInterface> {
    const fileInYamlFormat = await this.findFileBy(null, '.yaml').startSearch();
    const result: OasLoaderInterface = {};
    if (fileInYamlFormat.length) {
      for (const file of fileInYamlFormat) {
        const isSwaggerApi = this.isSwaggerApiFile((await readFilePromise(file.path, 'utf-8')));
        if (isSwaggerApi) {
          result.api = await this.loadYamlPromise(file.path);
          result.definitions = await this.getSwaggerDefinitions(result.api);
          result.examples = await this.getSwaggerExamples(result.api);
        }
      }
      if (result.api) return result;
    }

    const fileInJsonFormat = await this.findFileBy(null, '.json').startSearch();
    if (fileInJsonFormat.length) {
      for (const file of fileInJsonFormat) {
        const content = await readFilePromise(file.path, 'utf-8');
        const isSwaggerApi = this.isSwaggerApiFile(content);
        if (isSwaggerApi) {
          result.api = content;
          result.definitions = await this.getSwaggerDefinitions(result.api);
          result.examples = await this.getSwaggerExamples(result.api);
        }
      }
      if (result.api) return result;
    }

    throw new Error('Failed to find main api definition file.');
  }

  private async getSwaggerDefinitions(api: Object): Promise<Object[]> {
    const stringApi = JSON.stringify(api);
    const reg = /\$ref\"\:\"[^#](.[^"}]+)\#/g;
    const externalPaths = stringApi.match(reg);
    if (externalPaths) {
      return Promise.all(externalPaths.map(this.loadSwaggerDefinition));
    }
    return Promise.resolve([]);
  }

  private async getSwaggerExamples(api: Object): Promise<Object[]> {
    const stringApi = JSON.stringify(api);
    const reg = /externalValue\"\:\"[^#](.[^"}]+)\#/g;
    const externalPaths = stringApi.match(reg);
    if (externalPaths) {
      return Promise.all(externalPaths.map(this.loadSwaggerExamples));
    }
    return Promise.resolve([]);
  }

  private async loadSwaggerDefinition(path: string) {
    const parsedPath = path.slice(8, path.length - 1);
    const name = fsPath.basename(parsedPath, fsPath.extname(parsedPath));
    try {
      const content = await readFilePromise(`./.temp${parsedPath}`, 'utf-8');
      return { name, content };
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  private async loadSwaggerExamples(path: string) {
    const parsedPath = path.slice(17, path.length - 1);
    const name = fsPath.basename(parsedPath, fsPath.extname(parsedPath));
    try {
      const content = await readFilePromise(`./.temp${parsedPath}`, 'utf-8');
      return { name, content };
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
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
        result.api = await this.loadYamlPromise(this.path);
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
