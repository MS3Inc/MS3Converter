import * as path from 'path';
import * as YAML from 'yamljs';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { promise as MkdirpPromise } from 'mkdirp2';
import { cloneDeep } from 'lodash';

import { API as MS3Interface } from '../../ms3/ms3-v1-api-interface';
import { API as OAS20Interface } from '../../oas/oas-20-api-interface';
import { API as OAS30Interface } from '../../oas/oas-30-api-interface';
import ConvertorOptions, { format } from '../../common/convertor-options-interface';
import mergeOverlayWithApi from '../ms3-overlay-to-api';
import mergeExtensionWithApi from '../ms3-extension-to-api';
import convertOAS20 from './ms3-to-oas-20';
import convertOAS30 from './ms3-to-oas-30';

const writeFilePromise = promisify(writeFile);

interface DataToWrite {
  path: string;
  content?: OAS20Interface | OAS30Interface | string;
}

export default class MS3toOAS {
  externalFiles: any = {
    examples: [],
    schemas: []
  };
  result: DataToWrite = {
    path: ''
  };

  constructor(protected ms3API: any, protected options: ConvertorOptions) {}

  static getDefaultConfig(): ConvertorOptions {
    return {
      fileFormat: 'json',
      asSingleFile: true,
      oasVersion: '3.0'
    };
  }

  async convert() {
    const version = this.options.oasVersion || '3.0';

    switch (this.ms3API.entityTypeName) {
      case 'overlay':
        this.ms3API = mergeOverlayWithApi(this.ms3API);
      case 'extension': {
        this.ms3API = mergeExtensionWithApi(this.ms3API);
      }
      case 'library':
        throw new Error('Library can not be converted to swagger.');
    }

    let result = null;
    if (version == '2.0') result = convertOAS20(this.ms3API, this.options);
    if (version == '3.0') result = convertOAS30(this.ms3API, this.options);
    this.result.content = result.API;
    this.externalFiles = result.externalFiles;

    await this.finalize();

    return this.result.content;
  }

  protected async finalize() {
    if (this.options.destinationPath)
      await this.write();
    this.result.content = this.stringifyContent(<OAS20Interface | OAS30Interface> this.result.content, this.options.fileFormat);
  }

  protected async write() {
    this.result.path = path.join(this.options.destinationPath, `api.${this.options.fileFormat == 'json' ? 'json' : 'yaml'}`);
    await this.writeApiToDisc(this.result);

    if (this.externalFiles.examples.length) {
      await MkdirpPromise(path.join(this.options.destinationPath, 'examples'));
      await this.writeExamplesToDisk();
    }

    if (this.externalFiles.schemas.length) {
      await MkdirpPromise(path.join(this.options.destinationPath,  'schemas'));
      await this.writeSchemasToDisk();
    }
  }

  protected stringifyContent(content: object, format: 'yaml' | 'json') {
    if (this.options.fileFormat == 'yaml') {
      return YAML.stringify(content, 2);
    }
    return JSON.stringify(content, undefined, 2);
  }

  protected async writeApiToDisc(data: any) {
    const resultContent = this.stringifyContent(data.content, this.options.fileFormat);
    await writeFilePromise(data.path, resultContent);
  }

  protected writeExamplesToDisk() {
    const promisesArray: any = this.externalFiles.examples.map((file: any) => writeFilePromise(file.path, JSON.stringify(file.content, undefined, 2)));
    return Promise.all(promisesArray);
  }

  protected writeSchemasToDisk() {
    const promisesArray: any = this.externalFiles.schemas.map((file: any) => writeFilePromise(file.path, JSON.stringify(file.content, undefined, 2)));
    return Promise.all(promisesArray);
  }

  static create(api: MS3Interface, options: ConvertorOptions = this.getDefaultConfig() ) {
    return new MS3toOAS(api, options);
  }
}
