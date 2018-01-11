import MS3toOAS from './../ms3/ms3-to-oas/index';
import ConvertorOptions from '../common/convertor-options-interface';
import { ms3Settings, oasSettings } from './files/MS3-to-OAS-20/ms3-settings-to-oas';
import { ms3DataTypes, oasDataTypes, oasDataTypesExternal } from './files/MS3-to-OAS-20/ms3-datatypes-to-oas';
import { ms3Examples, oasExamples } from './files/MS3-to-OAS-20/ms3-examples-to-oas';
import { ms3SecuritySchemes, oasSecuritySchemes } from './files/MS3-to-OAS-20/ms3-securityschemes-to-oas';
import { ms3NestedResources, oasNestedResources } from './files/MS3-to-OAS-20/ms3-nested-resources-to-oas';
import { ms3ResourceWithParameters, oasResourceWithParameters } from './files/MS3-to-OAS-20/ms3-resource-with-parameters-to-oas';
import { ms3ResourceWithRequestBody, oasResourceWithRequestBody } from './files/MS3-to-OAS-20/ms3-resource-with-request-body-to-oas';
import { ms3ResourceWithResponses, oasResourceWithResponses, oasResourceWithResponsesAndInlineExamples } from './files/MS3-to-OAS-20/ms3-resource-with-responses-to-oas';
import { ms3ResourceWithPathParameters, oasResourceWithPathParameters } from './files/MS3-to-OAS-20/ms3-resource-with-path-parameters-to-oas';
import { ms3APIBaseUri, OASApiHostAndBasePath } from './files/MS3-to-OAS-20/ms3-baseuri-to-oas';

import { exists } from 'fs';
import { promisify } from 'util';
import * as rmdir from 'rmdir';
import * as path from 'path';
import { v4 } from 'uuid';
import * as mkdirp from 'mkdirp2';

const mkdirPromise = promisify(mkdirp);
const fileExistsPromise = promisify(exists);
const rmdirPromise = promisify(rmdir);
const destinationForTestResults = path.join(__dirname, '..', '..', '.tmp', 'oas-tests');
const getUniqueFolder = (stringPath: string) => path.join(stringPath, v4());

describe('ms3 to oas 20 tests', () => {

  beforeAll(async (done) => {
    await mkdirPromise(destinationForTestResults);
    done();
  });

  afterAll(async (done) => {
    await rmdirPromise(destinationForTestResults);
    done();
  });

  test('MS3 settings should be converted to OAS 2.0 successfully', async () => {
    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: true,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3Settings, options).convert() )).toEqual(oasSettings);
  });

  test('MS3 datatypes should be converted to OAS 2.0 definitions successfully', async () => {
    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: true,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3DataTypes, options).convert() )).toEqual(oasDataTypes);
  });

  test('MS3 datatypes should be converted to OAS 2.0 definitions with references && external files should be created in "/schemas" folder', async () => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    const result = await MS3toOAS.create(ms3DataTypes, options).convert();
    expect(JSON.parse(<string> result)).toEqual(oasDataTypesExternal);
    const mainFileExist = await fileExistsPromise(path.join(destPath, 'api.json'));
    const schemasFolderExist = await fileExistsPromise(path.join(destPath, 'schemas', 'ArrayInclude.json'));

    expect(mainFileExist && schemasFolderExist).toEqual(true);
  });

  test('MS3 examples should be converted to OAS with references && external files should be created in "/examples" folder', async () => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const config: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3Examples, config).convert() )).toEqual(oasExamples);

    const mainFileExist = await fileExistsPromise(path.join(destPath, 'api.json'));
    const examplesFolderExist = await fileExistsPromise(path.join(destPath, 'examples', 'exampleJSON.json'));

    expect(mainFileExist && examplesFolderExist).toEqual(true);
  });

  test('MS3 security schemes should be converted to OAS 2.0 successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3DataTypes, options).convert() )).toEqual(oasDataTypesExternal);
  });

  test('MS3 nested resources should be converted to OAS 2.0 successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3NestedResources, options).convert() )).toEqual(oasNestedResources);
  });

  test('MS3 resource with parameters should be converted to OAS 2.0 successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3ResourceWithParameters, options).convert() )).toEqual(oasResourceWithParameters);
  });

  test('MS3 resource with request body should be converted to OAS 2.0 successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3ResourceWithRequestBody, options).convert() )).toEqual(oasResourceWithRequestBody);
  });

  test('MS3 resource with responses should be converted to OAS 2.0 successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3ResourceWithResponses, options).convert() )).toEqual(oasResourceWithResponses);
  });

  test('MS3 resource with responses should be converted to OAS 2.0 with inline examples successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: true,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3ResourceWithResponses, options).convert() )).toEqual(oasResourceWithResponsesAndInlineExamples);
  });

  test('MS3 resource with responses should be converted to OAS 2.0 with inline examples successfully', async() => {
    const destPath = getUniqueFolder(destinationForTestResults);
    await mkdirPromise(destPath);

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: false,
      destinationPath: destPath,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3ResourceWithPathParameters, options).convert() )).toEqual(oasResourceWithPathParameters);
  });

  test('MS3 baseUri should be converted to host and basePath', async() => {

    const options: ConvertorOptions = {
      fileFormat: 'json',
      asSingleFile: true,
      oasVersion: '2.0'
    };

    expect(JSON.parse( <string> await MS3toOAS.create(ms3APIBaseUri, options).convert() )).toEqual(OASApiHostAndBasePath);
  });

});