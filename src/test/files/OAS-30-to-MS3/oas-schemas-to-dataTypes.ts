import { DataType } from './../../../ms3/ms3-v1-api-interface';
import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-30-api-interface';

export const oasPrimitive: OASInterface.Schema = {
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
  }
};

export const ms3Primitive: MS3Interface.DataType = {
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
};

export const oasArray: OASInterface.Schema = {
  'mySchema': {
    'type': 'array',
    'items': {
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
    }
  }
};

export const ms3Array: MS3Interface.DataType = {
  'name': 'mySchema',
  'type': 'array',
  'items': {
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
  '__id': 'uuid'
};

export const oasObject: OASInterface.Schema = {
  'mySchema': {
    'type': 'object',
    // 'required': [
    //   'id',
    //   'name'
    // ],
    'properties': {
      'name': {
        'type': 'string'
      },
      'type': {
        'type': 'string'
      },
      'id': {
        'type': 'string'
      }
    }
  }
};

export const ms3Object: MS3Interface.DataType = {
  'name': 'mySchema',
  'type': 'object',
  'properties': [
    {
      'name': 'name',
      'type': 'string',
      // 'required': true
    },
    {
      'name': 'type',
      'type': 'string',
    },
    {
      'name': 'id',
      'type': 'string',
      // 'required': true
    }
  ],
  '__id': 'uuid'
};