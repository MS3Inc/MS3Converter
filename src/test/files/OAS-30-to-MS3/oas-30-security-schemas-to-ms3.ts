import { API as MS3 } from './../../../ms3/ms3-v1-api-interface';
import { API as OAS } from './../../../oas/oas-30-api-interface';

export const ms3SecuritySchemasResult: MS3 = {
  'settings': {
    'title': 'params',
    'baseUri': 'http://base.uri',
    'description': 'API description',
    'version': '3.0'
  },
  'apro_version': '1.0',
  'entityTypeName': 'api',
  'dataTypes': [],
  'examples': [],
  'resources': [],
  'securitySchemes': [
    {
      'name': 'Auth 2.0',
      'type': 'OAuth 2.0',
      'description': 'description',
      'settings': {
        'accessTokenUri': 'http://uri.uri',
        'authorizationGrants': [
          'client_credentials',
          'implicit'
        ],
        'authorizationUri': 'http://uri.uri',
        'scopes': [
          'HMAC-SHA1',
          'RSA-SHA1'
        ]
      },
      '__id': 'uuid'
    }
  ]
};

export const oas_security_schemas: OAS = {
  openapi: '3.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '3.0'
  },
  paths: {},
  components: {
    securitySchemes: {
      'Auth 2.0': {
        description: 'description',
        type: 'oauth2',
        flows: {
          'clientCredentials': {
            scopes: [
              'HMAC-SHA1',
              'RSA-SHA1'
            ],
            tokenUrl: 'http://uri.uri'
          },
          'implicit': {
            authorizationUrl: 'http://uri.uri',
            scopes: [
              'HMAC-SHA1',
              'RSA-SHA1'
            ]
          }
        }
      }
    }
  }
};