import MS3toOAS from './../ms3/ms3-to-oas/index';
import { originalOAuth20, resultOAuth20 } from './files/MS3-security-schemes-to-OAS.ts/OAuth20';
import { originalBasicAuth, resultBasicAuth } from './files/MS3-security-schemes-to-OAS.ts/BasicAuthentication';
import { originalBasicAndDigestAuth, resultBasicAndDigestAuth } from './files/MS3-security-schemes-to-OAS.ts/Basic-and-Digest-auth';

test('One MS3 resource with headers and query parameters should be converted to OAS successfully', async () => {
  const result = await MS3toOAS.create(originalOAuth20).convert();
  expect(JSON.parse(<string> result)).toEqual(resultOAuth20);
});

test('One MS3 resource with headers and query parameters should be converted to OAS successfully', async () => {
  const result = await MS3toOAS.create(originalBasicAuth).convert();
  expect(JSON.parse(<string> result)).toEqual(resultBasicAuth);
});

test('One MS3 resource with headers and query parameters should be converted to OAS successfully', async () => {
  const result = await MS3toOAS.create(originalBasicAndDigestAuth).convert();
  expect(JSON.parse(<string> result)).toEqual(resultBasicAndDigestAuth);
});