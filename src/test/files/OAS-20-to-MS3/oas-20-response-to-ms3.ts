import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';

export const ms3ResourceWithResponses: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://params/',
    version: '2.0',
    protocols: ['HTTP']
  },
  dataTypes: [{
    __id: 'uuid',
    type: 'string',
    default: 'default',
    description: 'desc',
    name: 'schema',
  }],
  securitySchemes: [],
  ms3_version: '1.0',
  entityTypeName: 'api',
  'resources': [
    {
      'path': '/res',
      'methods': [
        {
          'active': true,
          'name': 'GET',
          'responses': [
            {
              'code': '200',
              'description': 'description',
              'headers': [
                {
                  'displayName': 'header',
                  'description': 'description',
                  'type': 'number',
                  'default': 5
                },
                {
                  'displayName': 'header2',
                  'description': 'description2',
                  'type': 'number',
                  'default': 5
                }
              ],
              body: [{
                contentType: 'application/json',
                type: 'uuid'
              }]
            }
          ],
        }
      ],
      '__id': 'uuid'
    }
  ]
};

export const oasResourceWithResponses: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    version: '2.0'
  },
  host: 'params',
  basePath: '/',
  paths: {
    '/res': {
      get: {
        operationId: 'RES_GET',
        responses: {
          '200': {
            description: 'description',
            headers: {
              'header': {
                description: 'description',
                type: 'number',
                default: 5
              },
              'header2': {
                description: 'description2',
                type: 'number',
                default: 5
              }
            },
            schema: {
              '$ref': '#/definitions/schema'
            }
          }
        }
      }
    }
  },
  definitions: {
    'schema': {
      'default': 'default',
      'description': 'desc',
      'title': 'schema',
      'type': 'string',
    }
  }
};