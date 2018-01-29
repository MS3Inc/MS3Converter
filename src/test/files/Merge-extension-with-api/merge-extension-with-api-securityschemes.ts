import { API } from './../../../ms3/ms3-v1-api-interface';
import Extension from './../../../ms3/ms3-v1-extension-interface';
import AproVersion from '../../../apro_version';

export const originalProjectWithSecuritySchemes: Extension = {
  'apro_version': AproVersion,
  'settings': {
    'extends': {
      'entityTypeName': 'api',
      'apro_version': AproVersion,
      'settings': {
        'baseUri': 'http://mergeAPI',
        'title': 'Merge API',
      },
      'annotationTypes': [
        {
          'name': 'annotation',
          'description': 'desc',
          'type': 'string'
        }
      ],
      'traits': [
        {
          'name': 'trait',
          'headers': [
            {
              'displayName': 'number',
              'type': 'number',
              'minLength': 2,
              'maxLength': 10
            },
            {
              'displayName': 'string',
              'type': 'string',
              'pattern': '.*',
              'minLength': 2,
              'maxLength': 10
            }
          ],
          'responses': [
            {
              'code': '101',
              'description': 'should be overwritten'
            }
          ],
          '__id': 'api-trait-id-1',
        }
      ]
    },
    'baseUri': 'http://mergeEXT',
    'title': 'Merge EXT',
  },
  'entityTypeName': 'api',
  'annotationTypes': [
    {
      'name': 'annotation',
      'description': 'description',
      'type': 'string'
    }
  ],
  'traits': [
    {
      'name': 'trait',
      'description': 'description',
      'queryParameters': [
        {
          'displayName': 'integer',
          'type': 'integer',
          'description': 'description',
          'default': 1,
          'minimum': 2,
          'maximum': 1,
        }
      ],
      'headers': [
        {
          'displayName': 'number',
          'type': 'number',
          'minLength': 2,
          'maxLength': 10
        },
        {
          'displayName': 'string',
          'type': 'integer',
          'minLength': 3,
          'maxLength': 11
        }
      ],
      'responses': [
        {
          'code': '101',
          'description': 'should overwrite'
        }
      ],
      '__id': 'ext-trait-id-1',
    }
  ]
};

export const resultProjectWithSecuritySchemes: API = {
  'apro_version': AproVersion,
  'settings': {
    'baseUri': 'http://mergeEXT',
    'title': 'Merge EXT',
  },
  'annotationTypes': [
    {
      'name': 'annotation',
      'description': 'description',
      'type': 'string'
    }
  ],
  'traits': [
    {
      'name': 'trait',
      'description': 'description',
      'queryParameters': [
        {
          'displayName': 'integer',
          'type': 'integer',
          'description': 'description',
          'default': 1,
          'minimum': 2,
          'maximum': 1,
        }
      ],
      'headers': [
        {
          'displayName': 'number',
          'type': 'number',
          'minLength': 2,
          'maxLength': 10
        },
        {
          'displayName': 'string',
          'type': 'integer',
          'minLength': 3,
          'maxLength': 11
        }
      ],
      'responses': [
        {
          'code': '101',
          'description': 'should overwrite'
        }
      ],
      '__id': 'ext-trait-id-1',
    }
  ],
  'entityTypeName': 'api'
};