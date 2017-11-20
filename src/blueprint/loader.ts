/**
 * Loads blueprint api from specified path to ms3 format
 */
// import Drafter from 'drafter.js';
const Drafter = require('drafter.js');
import LoaderInterface from '../common/loader-interface';
import { readFile, exists } from 'fs';
import { promisify } from 'util';
const readFilePromise = promisify(readFile);
const fileExists = promisify(exists);
// const drafterParse = promisify(Drafter.parse);

export default class ApiBlueprintLoader implements LoaderInterface {
  constructor(private sourcePath: string) {}

  // TODO: make sure it searches for the whole folder structure and
  // loads all the files related to the api definition
  async load(): Promise<object> {
    const fileContent = await readFilePromise(this.sourcePath, 'utf-8');
    if (!fileContent) throw Error('Api Blueprint loading failed. Source File is Empty.');
    const parsedContent = await (() => new Promise((resolve, reject) => {
      Drafter.parse(fileContent, { json: true }, (err: Error, result: any) => {
        if (err) return reject(err);
        resolve(result);
      });
    }))();

      return {
      [this.sourcePath]: parsedContent
    };
  }

  loadSingleFile () {

  }

  static create(sourcePath: string): LoaderInterface {
    return new ApiBlueprintLoader(sourcePath);
  }
}