import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-30-api-interface';
import AproVersion from '../../../apro_version';

export const oasPathsWithRequestBody: OASInterface.API = {
  openapi: '3.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '3.0',
  },
  components: {
    schemas: {
      'mySchema': {
        'type': 'string',
        'description': '123',
        'example': '2',
        'default': '3',
        'pattern': '2',
        'minLength': 1,
        'maxLength': 4,
        'enum': [
          '123'
        ]
      },
    },
    examples: {
      cat : {
        'summary': 'An example of a cat',
        'value': {
          'name': 'Fluffy',
          'petType': 'Cat',
          'color': 'White',
          'gender': 'male',
          'breed': 'Persian'
        }
      },
    }
  },
  paths: {
    '/res': {
      get: {
        operationId: 'RES_GET',
        description: 'desc',
        responses: {},
        requestBody: {
          content: {
            'application/json': {
              schema: {
                '$ref': '#/components/schemas/mySchema'
              },
              examples: {
                'ex': {
                  '$ref': '#/components/examples/cat'
                }
              }
            }
          }
        }
      },
      post: {
        operationId: 'RES_POST',
        responses: {},
      },
      put: {
        operationId: 'RES_PUT',
        responses: {}
      },
      delete: {
        operationId: 'RES_DELETE',
        responses: {}
      }
    }
  }
};

export const ms3ResourcesWithRequestBody: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://base.uri',
    description: 'API description',
    version: '3.0'
  },
  apro_version: AproVersion,
  entityTypeName: 'api',
  resources: [
    {
      __id: 'uuid',
      path: '/res',
      methods: [
        {
          name: 'GET',
          active: true,
          description: 'desc',
          responses: [],
          body: [
            {
              contentType: 'application/json',
              type: 'uuid',
              selectedExamples: ['uuid']
            }
          ]
        },
        {
          name: 'POST',
          active: true,
          responses: [],
        },
        {
          name: 'PUT',
          active: true,
          responses: [],
        },
        {
          name: 'DELETE',
          active: true,
          responses: [],
        },
        {
          active: false,
          description: '',
          headers: [],
          name: 'OPTIONS',
          queryParameters: [],
          responses: [],
          selectedTraits: [],
        },
        {
          active: false,
          description: '',
          headers: [],
          name: 'HEAD',
          queryParameters: [],
          responses: [],
          selectedTraits: [],
        },
        {
          active: false,
          description: '',
          headers: [],
          name: 'PATCH',
          queryParameters: [],
          responses: [],
          selectedTraits: [],
        }
      ]
    }
  ],
  examples: [
    {
      '__id': 'uuid',
      'title': 'cat',
      'format': 'json',
      'content': '{\"name\":\"Fluffy\",\"petType\":\"Cat\",\"color\":\"White\",\"gender\":\"male\",\"breed\":\"Persian\"}',
    },
  ],
  dataTypes: [
    {
      'type': 'string',
      'description': '123',
      'name': 'mySchema',
      'example': '2',
      'default': '3',
      'pattern': '2',
      'minLength': 1,
      'maxLength': 4,
      'enum': [
        '123'
      ],
      '__id': 'uuid'
    }
  ]
};
