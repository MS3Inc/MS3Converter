import convertOAS20toMS3 from '../oas/oas-to-ms3/oas-20-to-ms3';
import { oasSettings, ms3Settings } from './files/OAS-20-to-MS3/oas-20-settings-to-ms3';

test('Swagger settings should be converted to MS3 successfully', async() => {
  expect(convertOAS20toMS3(oasSettings)).toEqual(ms3Settings);
});