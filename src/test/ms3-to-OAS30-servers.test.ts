import MS3toOAS from './../ms3/ms3-to-oas/index';
import * as ApiInterfaces from './../ms3/ms3-v1-api-interface';
import * as OASInterfaces from './../oas/oas-30-api-interface';

const project: ApiInterfaces.API = {
  settings: {
    title: 'params',
    baseUri: 'http://params/{test}',
    description: 'API description',
    baseUriParameters: [{
      enum: ['1', '2', '3'],
      default: 'MyDefault',
      displayName: 'test',
      description: 'description2'
    }]
  },
  ms3_version: '1.0.1',
  entityTypeName: 'api'
};

test('MS3 settings should be converted to OAS30 servers successfully', async() => {
  const expectedResult: OASInterfaces.API = {
    openapi: '3.0',
    info: {
      title: 'params',
      description: 'API description',
      version: '3.0',
    },
    servers: [{
      url: 'http://params/{test}',
      variables: [{
        test: {
          enum: ['1', '2', '3'],
          default: 'MyDefault',
          description: 'description2'
        }
      }]
    }],
    components: {},
    paths: {}
  };
  expect(JSON.parse( <string> await MS3toOAS.create(project).convert() )).toEqual(expectedResult);
});
