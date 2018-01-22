import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';

export const oasBody: OASInterface.API = {
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
        responses: {},
        consumes: [
          'application/json',
          'application/xml'
        ],
        produces: [
          'application/xml',
          'application/json'
        ],
        parameters: [
          {
            name: 'string',
            in: 'body',
            description: 'description',
            required: true,
            schema: {
              '$ref': '#/definitions/Order'
            }
          },
          {
            name: 'another',
            in: 'body',
            description: 'description',
            required: true,
            schema: {
              'type': 'string',
              'description': 'Order Status',
              'enum': [
                'placed',
                'approved',
                'delivered'
              ]
            }
          }
        ]
      }
    },
  },
  definitions: {
    'Order': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'integer',
          'format': 'int64'
        },
        'petId': {
          'type': 'integer',
          'format': 'int64'
        },
        'quantity': {
          'type': 'integer',
          'format': 'int32'
        },
        'shipDate': {
          'type': 'string',
          'format': 'int32'
        },
        'status': {
          'type': 'string',
          'description': 'Order Status',
          'enum': [
            'placed',
            'approved',
            'delivered'
          ]
        },
        'complete': {
          'type': 'boolean',
          'default': false
        }
      }
    }
  }
};

export const ms3Body: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://base.uri/v2',
    description: 'API description',
    version: '2.0',
    protocols: ['http']
  },
  ms3_version: '1.0',
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
          body: [
            {
              'contentType': 'application/json',
              'type': 'uuid',
            },
            {
              'contentType': 'application/json',
              'type': 'uuid',
            }
          ]
        }
      ],
      '__id': 'uuid'
    },
  ],
  dataTypes: [
    {
      'type': 'object',
      'properties': [
        {
          'type': 'integer',
          'format': 'int64',
          'name': 'id'
        },
        {
          'type': 'integer',
          'format': 'int64',
          'name': 'petId'
        },
        {
          'type': 'integer',
          'format': 'int32',
          'name': 'quantity'
        },
        {
          'type': 'string',
          'format': 'int32',
          'name': 'shipDate'
        },
        {
          'type': 'string',
          'description': 'Order Status',
          'enum': [
            'placed',
            'approved',
            'delivered'
          ],
          'name': 'status'
        },
        {
          'type': 'boolean',
          'name': 'complete'
        }
      ],
      'name': 'Order',
      '__id': 'uuid'
    },
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

  ]
};
