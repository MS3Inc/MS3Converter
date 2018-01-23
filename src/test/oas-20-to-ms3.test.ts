import convertOAS20toMS3 from '../oas/oas-to-ms3/oas-20-to-ms3';
import { oasSettings, ms3Settings } from './files/OAS-20-to-MS3/oas-20-settings-to-ms3';
import { oasDefinitions, ms3DataTypes } from './files/OAS-20-to-MS3/oas-20-definitions-to-ms3';
import { oasHeaderQuery, ms3HeaderQuery } from './files/OAS-20-to-MS3/oas-query-header-to-ms3';
import { oasBody, ms3Body } from './files/OAS-20-to-MS3/oas-20-body-to-ms3';
import { oasSecuritySchemes, ms3SecuritySchemes } from './files/OAS-20-to-MS3/oas-20-security-schemas-to-ms3';
import { ms3ResourceWithResponses, oasResourceWithResponses } from './files/OAS-20-to-MS3/oas-20-response-to-ms3';

test('Swagger settings should be converted to MS3 successfully', async() => {
  expect(convertOAS20toMS3(oasSettings)).toEqual(ms3Settings);
});

test('Swagger definitions should be converted to MS3 dataTypes successfully', async() => {
  expect(convertOAS20toMS3(oasDefinitions)).toEqual(ms3DataTypes);
});

test('Swagger headers and query should be converted to MS3 successfully', async() => {
  expect(convertOAS20toMS3(oasHeaderQuery)).toEqual(ms3HeaderQuery);
});

test('Swagger securityDefinitions should be converted to MS3 successfully', async() => {
  expect(convertOAS20toMS3(oasSecuritySchemes)).toEqual(ms3SecuritySchemes);
});

test('Swagger path body should be converted to MS3 successfully', async() => {
  expect(convertOAS20toMS3(oasBody)).toEqual(ms3Body);
});

// test('Swagger response should be converted to MS3 successfully', async() => {
//   expect(convertOAS20toMS3(oasResourceWithResponses)).toEqual(ms3ResourceWithResponses);
// });