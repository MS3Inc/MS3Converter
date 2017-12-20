import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';

export const oasDefinitions: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '2.0',
  },
  host: 'base.uri',
  basePath: '/v2',
  schemes: ['http'],
  paths: {},
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
  },
};

export const ms3DataTypes: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://base.uri/v2',
    description: 'API description',
    version: '2.0',
    protocols: ['http']
  },
  ms3_version: '1.0',
  entityTypeName: 'api',
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
    }
  ],
  resources: []
};
