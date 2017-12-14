import MS3toOAS from './../ms3/ms3-to-oas/index';
import { originalResourceWithParameters, resultResourceWithParameters } from './files/MS3-resources-to-OAS/resource-with-parameters';
import { originalNestedResources, resultNestedResources } from './files/MS3-resources-to-OAS/nested-resources';
import { originalResourceWithRequestBody, resultResourceWithRequestBody } from './files/MS3-resources-to-OAS/resource-with-request-body';
import { originalResourceWithResponses, resultResourceWithResponses } from './files/MS3-resources-to-OAS/resource-with-responses';
import { originalResourceWithSecuredBy, resultResourceWithSecuredBy } from './files/MS3-resources-to-OAS/resource-with-securedBy';

test('One MS3 resource with headers and query parameters should be converted to OAS successfully', async () => {
  const result = await MS3toOAS.create(originalResourceWithParameters).convert();
  expect(JSON.parse(<string> result)).toEqual(resultResourceWithParameters);
});

test('Nested MS3 resources should be converted to OAS successfully', async () => {
  const result = await MS3toOAS.create(originalNestedResources).convert();
  expect(JSON.parse(<string> result)).toEqual(resultNestedResources);
});

test('MS3 resources with bodies should be converted to OAS successfully', async () => {
  const result = await MS3toOAS.create(originalResourceWithRequestBody).convert();
  expect(JSON.parse(<string> result)).toEqual(resultResourceWithRequestBody);
});

test('MS3 resources with responses should be converted to OAS successfully 1', async () => {
  const result = await MS3toOAS.create(originalResourceWithResponses).convert();
  expect(JSON.parse(<string> result)).toEqual(resultResourceWithResponses);
});

test('MS3 resources with responses should be converted to OAS successfully 2', async () => {
  const result = await MS3toOAS.create(originalResourceWithSecuredBy).convert();
  expect(JSON.parse(<string> result)).toEqual(resultResourceWithSecuredBy);
});
