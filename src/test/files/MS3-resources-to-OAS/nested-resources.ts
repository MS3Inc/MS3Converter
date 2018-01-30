import { API as MS3 } from './../../../ms3/ms3-v1-api-interface';
import { API as OAS } from './../../../oas/oas-30-api-interface';
import AproVersion from '../../../apro_version';

export const originalNestedResources: MS3 = {
  'settings': {
    'title': 'params',
    'baseUri': 'http://params'
  },
  'apro_version': AproVersion,
  'entityTypeName': 'api',
  'resources': [
    {
      'path': '/res',
      'name': 'res',
      'methods': [
        {
          'active': true,
          'name': 'GET',
        },
        {
          'active': true,
          'name': 'POST'
        }
      ],
      '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
    },
    {
      'path': '/nested',
      'name': 'nested',
      'parentId': 'f068746b-acd9-40c8-af83-83a89095b0a0',
      'methods': [
        {
          'active': true,
          'name': 'GET',
        }
      ],
      '__id': '880ddafe-81a1-4ff3-841e-5bb80c146997'
    }
  ]
};

export const resultNestedResources: OAS = {
  openapi: '3.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '3.0'
  },
  servers: [{
    url: 'http://params'
  }],
  paths: {
    '/res': {
      get: {
        operationId: 'RES_GET',
        responses: {},
      },
      post: {
        operationId: 'RES_POST',
        responses: {},
      }
    },
    '/res/nested': {
      get: {
        operationId: 'NESTED_GET',
        responses: {},
      }
    }
  },
  components: {}
};