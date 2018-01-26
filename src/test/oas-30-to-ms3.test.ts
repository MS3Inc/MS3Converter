import convertOAS30toMS3 from '../oas/oas-to-ms3/oas-30-to-ms3';
import { oasSettings, ms3Settings } from './files/OAS-30-to-MS3/oas-30-settings-to-ms3';
import { oasPathsWithParameters, ms3ResourcesWithParameters } from './files/OAS-30-to-MS3/oas-30-resources-parameters-to-ms3';
import { oasPathsWithRequestBody, ms3ResourcesWithRequestBody } from './files/OAS-30-to-MS3/oas-30-resources-request-body-to-ms3';
import { oasPathsWithResponses, ms3ResourcesWithResponses } from './files/OAS-30-to-MS3/oas-30-resource-responses-to-ms3';
import SchemasToDataTypes from '../oas/schemas-to-dataTypes';
import { oasPrimitive, ms3Primitive, oasArray, ms3Array, oasObject, ms3Object } from './files/OAS-30-to-MS3/oas-schemas-to-dataTypes';
import { oas_security_schemas, ms3SecuritySchemasResult } from './files/OAS-30-to-MS3/oas-30-security-schemas-to-ms3';
import { oas_security, ms3SecuredBy } from './files/OAS-30-to-MS3/oas-30-security-to-ms3-format';
import { oasResourceParams, ms3ResourcesWithPathParameters } from './files/OAS-30-to-MS3/oas-30-path-params-to-ms3';

test('OAS settings should be converted to MS3 successfully', async() => {
  expect(convertOAS30toMS3(oasSettings, null, null)).toEqual(ms3Settings);
});

test('OAS paths with parameters should be converted to MS3 resources successfully', async() => {
  expect(convertOAS30toMS3(oasPathsWithParameters, null, null)).toEqual(ms3ResourcesWithParameters);
});

test('OAS paths with request body should be converted to MS3 resources successfully', async() => {
  expect(convertOAS30toMS3(oasPathsWithRequestBody, null, null)).toEqual(ms3ResourcesWithRequestBody);
});

test('OAS paths with responses should be converted to MS3 resources successfully', async() => {
  expect(convertOAS30toMS3(oasPathsWithResponses, null, null)).toEqual(ms3ResourcesWithResponses);
});

test('OAS primitive schema should be converted successfully', async() => {
  expect(SchemasToDataTypes(oasPrimitive)).toEqual(ms3Primitive);
});

test('OAS array schema should be converted successfully', async() => {
  expect(SchemasToDataTypes(oasArray)).toEqual(ms3Array);
});

test('OAS object schema should be converted successfully', async() => {
  expect(SchemasToDataTypes(oasObject)).toEqual(ms3Object);
});

test('OAS security Schemas should should be converted successfully', async() => {
  expect(convertOAS30toMS3(oas_security_schemas, null, null)).toEqual(ms3SecuritySchemasResult);
});

test('OAS security property should be converted successfully', async() => {
  expect(convertOAS30toMS3(oas_security, null, null)).toEqual(ms3SecuredBy);
});

test('OAS path parameters should be converted successfully', async() => {
  expect(convertOAS30toMS3(oasResourceParams, null, null)).toEqual(ms3ResourcesWithPathParameters);
});