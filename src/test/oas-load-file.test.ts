import OasLoader from './../oas/loader';
import * as path from 'path';

test('Should fail with incorrect JSON format', async () => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'wrong-json.json');
  return expect(OasLoader.create(filePath).load()).rejects.toBeDefined();
});

test('Should fail with incorrect file extension', async () => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'wrong-json.apro');
  return expect(OasLoader.create(filePath).load()).rejects.toBeDefined();
});

test('Yaml swagger file should load without errors', async() => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.yaml');
  let error;
  try {
    await OasLoader.create(filePath).load();
  } catch (err) {
    error = err.message;
  }
  expect(error).toBe(undefined);
});

test('Json swagger file should load without errors', async() => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.json');
  let error;
  try {
    await OasLoader.create(filePath).load();
  } catch (err) {
    error = err.message;
  }
  expect(error).toBe(undefined);
});

test('Zip swagger file should load without errors', async() => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.zip');
  let error;
  try {
    await OasLoader.create(filePath).load();
  } catch (err) {
    error = err.message;
  }
  expect(error).toBe(undefined);
});

test('Should correctly parse definitions', async() => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.zip');
  const api = await OasLoader.create(filePath).load();

  expect(api.definitions[0]).toEqual({
    name: 'dataType',
    content: '{\n  "type": "object"\n}\n'
  });
});

test('Zip arch with custom yaml main name should load without errors', async() => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger_custom_main_name_yaml.zip');
  let error;
  try {
    await OasLoader.create(filePath).load();
  } catch (err) {
    error = err.message;
  }
  expect(error).toBe(undefined);
});

test('Zip arch with custom json main name should load without errors', async() => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger_custom_main_name_json.zip');
  let error;
  try {
    await OasLoader.create(filePath).load();
  } catch (err) {
    error = err.message;
  }
  expect(error).toBe(undefined);
});