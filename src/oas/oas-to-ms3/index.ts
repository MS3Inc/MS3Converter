import * as path from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { promise as MkdirpPromise } from 'mkdirp2';

import { API as MS3Interface } from '../../ms3/ms3-v1-api-interface';
import { API as OAS20Interface } from '../oas-20-api-interface';
import { API as OAS30Interface } from '../oas-30-api-interface';
import ConvertorOptions, { format } from '../../common/convertor-options-interface';
import convertOAS30toMS3 from '../oas-to-ms3/oas-30-to-ms3';
import convertOAS20toMS3 from '../oas-to-ms3/oas-20-to-ms3';

const writeFilePromise = promisify(writeFile);

interface DataToWrite {
  path: string;
  content?: MS3Interface;
}

export default class MS3toOAS {
  result: DataToWrite = {
    path: ''
  };

  constructor(protected oasAPI: any, protected options: any) {}

  convertOAStoMS3(): MS3Interface {
    if (this.oasAPI.api.openapi) {
      return convertOAS30toMS3(this.oasAPI.api, this.oasAPI.definitions);
    }
    else if (this.oasAPI.api.swagger == '2.0') {
      return convertOAS20toMS3(this.oasAPI.api);
    }
    else {
      throw new Error('Wrong Swagger format');
    }
  }

  async convert() {
    this.result.content = this.convertOAStoMS3();

    await this.write();

    return this.result.content;
  }

  protected async write() {
    if (this.options.destinationPath) {
      this.result.path = `${this.options.destinationPath}api.ms3`;
      await writeFilePromise(this.result.path, this.result.content);
    }
  }

  static create(api: MS3Interface, options: any) {
    return new MS3toOAS(api, options);
  }
}
