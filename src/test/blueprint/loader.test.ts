import BlueprintLoader from '../../blueprint/loader';
import * as path from 'path';

test('Loader should fail if reading siource file failed.', async () => {
  await expect(true).toEqual(true);
});

test('Loader should fail if source file is empty.', async () => {
  await expect(true).toEqual(true);
});

test('Loader should parse md file', async () => {
  await expect(true).toEqual(true);
});

test('Loader should parse whole folder structure and return map of all files involved in api description', async () => {
  await expect(true).toEqual(true);
});

// test('Loader should parse apib file', async () => {
//   const sourcePath = path.join(__dirname, '..', '..', '..', 'src', 'test', 'blueprint', 'source-files', 'simple-blueprint.apib');
//   const expected = 'EXPECTED';
//   const result = await BlueprintLoader.create(sourcePath).load();
//   await expect(BlueprintLoader.create(sourcePath).load()).resolves.toEqual(expected);
// });