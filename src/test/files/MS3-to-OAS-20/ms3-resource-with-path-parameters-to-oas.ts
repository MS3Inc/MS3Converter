import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';
import AproVersion from '../../../apro_version';

export const ms3ResourceWithPathParameters: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://params',
  },
  apro_version: AproVersion,
  entityTypeName: 'api',
  'resources': [
    {
      'path': '/res',
      'name': 'res',
      'pathVariables': [
        {
          'displayName': 'path',
          'type': 'string',
          'description': 'description',
          'pattern': '.*',
          'default': '',
          'example': 'example string',
          'repeat': false,
          'enum': [
            'enum1',
            'enum2'
          ],
          'minLength': 2,
          'maxLength': 10
        }
      ],
      'methods': [],
      '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
    }
  ]
};

export const oasResourceWithPathParameters: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    version: '2.0'
  },
  schemes: [
    'https'
  ],
  host: 'params',
  basePath: '/',
  paths: {
    '/res': {
      parameters: [
        {
          name: 'path',
          in: 'path',
          description: 'description',
          type: 'string',
          pattern: '.*',
          required: true,
          enum: [
            'enum1',
            'enum2'
          ],
          minLength: 2,
          maxLength: 10
        }
      ]
    }
  }
};