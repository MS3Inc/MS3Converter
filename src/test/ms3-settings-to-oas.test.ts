import MS3toOAS from './../ms3/ms3-to-oas';
import * as ApiInterfaces from './../ms3/ms3-v1-api-interface';
import * as LibraryInterfaces from './../ms3/ms3-v1-library-interface';

test('MS3 settings should be converted to OAS successfully', () => {
  const projectSettings: ApiInterfaces.API = {
    settings: {
      securedBy: [],
      baseUriParameters: [],
      protocols: [
          'HTTP'
      ],
      annotations: [],
      title: 'params',
      description: 'dsdsd',
      baseUri: 'http://params',
      version: '',
      mediaType: ''
    },
    ms3_version: '1.0.1',
    entityTypeName: 'api'
  };

  const expectedResult = {
    infoObject: {
      title: 'params',
      description: 'dsdsd',
      version: ''
    }
  };

  let error;
  let resultAPI;

  try {
    resultAPI = MS3toOAS.create(projectSettings).convert();
  } catch (err) {
    error = err.message;
  }

  expect(error).toBe(undefined);
  expect(resultAPI).toEqual(expectedResult);
});

test('MS3 settings to OAS convertion should fail with "library" entity type', () => {
  const projectSettings: LibraryInterfaces.Library = {
    settings: {
      securedBy: [],
      baseUriParameters: [],
      protocols: [
          'HTTP'
      ],
      annotations: [],
      title: 'params',
      usage: 'dsdsd',
      baseUri: 'http://params',
      version: '',
      mediaType: ''
    },
    ms3_version: '1.0.1',
    entityTypeName: 'library'
  };

  let error;

  try {
    MS3toOAS.create(projectSettings).convert();
  } catch (err) {
    error = err.message;
  }

  expect(error).toBe('Library can not be converted to swagger.');
});
