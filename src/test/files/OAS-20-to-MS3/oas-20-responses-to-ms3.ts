import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';

export const oasResponse: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '2.0',
  },
  host: 'base.uri',
  basePath: '/v2',
  schemes: ['http'],
  paths: {
    '/pet': {
      post: {
        summary: 'Add a new pet to the store',
        description: 'MyDescription',
        operationId: 'addPet',
        responses: {
          200: {
            description: 'description text',
            schema: {
              'type': 'string',
              'description': 'Order Status',
              'enum': [
                'placed',
                'approved',
                'delivered'
              ]
            },
            examples: {
              'application/json': {
                'hello': 'world'
              }
            },
            headers: {
              'X-Rate-Limit-Limit': {
                'description': 'The number of allowed requests in the current period',
                'type': 'integer'
              },
              'X-Rate-Limit-Remaining': {
                  'description': 'The number of remaining requests in the current period',
                  'type': 'integer'
              },
              'X-Rate-Limit-Reset': {
                  'description': 'The number of seconds left in the current period',
                  'type': 'integer'
              }
            }
          }
        },
        consumes: [
          'application/json',
          'application/xml'
        ],
        produces: [
          'application/xml',
          'application/json'
        ],
      }
    },
  }
};

export const ms3Response: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://base.uri/v2',
    description: 'API description',
    version: '2.0',
    protocols: ['http']
  },
  apro_version: '1.0',
  entityTypeName: 'api',
  securitySchemes: [],
  resources: [
    {
      'path': '/pet',
      'methods': [
        {
          'active': true,
          'name': 'POST',
          'description': 'MyDescription',
          responses: [
            {
              code: '200',
              description: 'description text',
              body: [{
                contentType: 'application/json',
                type: 'uuid',
                selectedExamples: ['uuid']
              }],
              headers: [
                {
                  displayName: 'X-Rate-Limit-Limit',
                  type: 'integer',
                  description: 'The number of allowed requests in the current period'
                },
                {
                  displayName: 'X-Rate-Limit-Remaining',
                  type: 'integer',
                  description: 'The number of remaining requests in the current period'
                },
                {
                  displayName: 'X-Rate-Limit-Reset',
                  type: 'integer',
                  description: 'The number of seconds left in the current period'
                }
              ]
            }
          ]
        }
      ],
      '__id': 'uuid'
    },
  ],
  dataTypes: [
    {
      'type': 'string',
      'description': 'Order Status',
      'enum': [
        'placed',
        'approved',
        'delivered'
      ],
      'name': 'default_name_1',
      '__id': 'uuid'
    },
  ],
  examples: [
    {
      __id: 'uuid',
      title: 'default_name_1',
      format: 'json',
      content: {
        'hello': 'world'
      }
    }
  ]
};
