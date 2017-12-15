import MS3toOAS from './../ms3/ms3-to-oas/index';
import { originalExamples, resultExamples, resultExamplesWithReferences } from './files/Project-with-examples';
import ConvertorOptions from './../common/convertor-options-interface';
import { exists } from 'fs';
import { promisify } from 'util';
import * as rmdir from 'rmdir';

const fileExistsPromise = promisify(exists);
const rmdirPromise = promisify(rmdir);

test('MS3 examples should be converted to OAS and included inline successfully', async () => {
  expect(JSON.parse( <string> await MS3toOAS.create(originalExamples).convert() )).toEqual(resultExamples);
});

test('MS3 examples should be converted to OAS with references && external files should be created in "/examples" folder', async () => {
  const config: ConvertorOptions = {
    fileFormat: 'json',
    asSingleFile: false,
    destinationPath: './'
  };

  expect(JSON.parse( <string> await MS3toOAS.create(originalExamples, config).convert() )).toEqual(resultExamplesWithReferences);

  const mainFileExist = await fileExistsPromise('./api.json');
  const examplesFolderExist = await fileExistsPromise('./examples/exampleJSON.json');
  await rmdirPromise('./api.json');
  await rmdirPromise('./examples');

  expect(mainFileExist && examplesFolderExist).toEqual(true);
});