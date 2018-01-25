import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-30-api-interface';

export const oasResourceParams: OASInterface.API = {
  'openapi': '3.0',
  'info': {
    'title': 'test_origin',
    'description': 'proj description',
    'version': '0.1'
  },
  'paths': {
    '/path/{pathUri}': {
      'parameters': [
        {
          'name': 'pathUri',
          'in': 'path',
          'required': true,
          'schema': {
            'default': '2',
            'type': 'string'
          }
        }
      ]
    }
  },
  'servers': [
    {
      'url': 'http://name.ru'
    }
  ],
  'components': {
    'schemas': {
    },
    'examples': {
    },
    'securitySchemes': {
    }
  }
};

export const ms3ResourcesWithPathParameters: MS3Interface.API = {
  'examples': [],
  'ms3_version': '1.0',
  'securitySchemes': [],
  'resources': [
    {
      'path': '\/path\/{pathUri}',
      'pathVariables': [
        {
          'displayName': 'pathUri',
          'type': 'string',
          'default': '2',
          'required': true
        }
      ],
      'methods': [
        {
          'active': false,
          'name': 'GET',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        },
        {
          'active': false,
          'name': 'POST',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        },
        {
          'active': false,
          'name': 'PUT',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        },
        {
          'active': false,
          'name': 'DELETE',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        },
        {
          'active': false,
          'name': 'OPTIONS',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        },
        {
          'active': false,
          'name': 'HEAD',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        },
        {
          'active': false,
          'name': 'PATCH',
          'description': '',
          'queryParameters': [],
          'headers': [],
          'selectedTraits': [],
          'responses': []
        }
      ],
      '__id': 'uuid'
    }
  ],
  'dataTypes': [],
  'settings': {
    'title': 'test_origin',
    'version': '0.1',
    'baseUri': 'http:\/\/name.ru',
    'description': 'proj description',
  },
  'entityTypeName': 'api'
};