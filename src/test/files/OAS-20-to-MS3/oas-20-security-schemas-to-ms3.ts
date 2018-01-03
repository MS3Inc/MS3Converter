import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';

export const ms3SecuritySchemes: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://params/',
    version: '2.0',
    securedBy: ['uuid']
  },
  ms3_version: '1.0',
  entityTypeName: 'api',
  dataTypes: [],
  examples: [],
  resources: [
    {
      __id: 'uuid',
      path: '/pet',
      methods: [{
        name: 'POST',
        active: true,
        description: 'MyDescription',
        securedBy: ['uuid'],
        responses: []
      }]
    }
  ],
  'securitySchemes': [
    {
      'name': 'Auth 2.0',
      'type': 'OAuth 2.0',
      'description': 'description',
      'settings': {
        'accessTokenUri': 'http://name.com',
        'authorizationUri': 'http://name.com',
        'authorizationGrants': [
          'implicit'
        ],
        'scopes': [
          'HMAC-SHA1',
          'RSA-SHA1'
        ]
      },
      '__id': 'uuid'
    },
    {
      'name': 'Basic Auth',
      'type': 'Basic Authentication',
      'description': 'description',
      '__id': 'uuid'
    }
  ]
};

export const oasSecuritySchemes: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    version: '2.0'
  },
  host: 'params',
  basePath: '/',
  paths: {
    '/pet': {
      post: {
        summary: 'Add a new pet to the store',
        description: 'MyDescription',
        operationId: 'addPet',
        security: [
          {
            'Auth 2.0': [
              'HMAC-SHA1',
              'RSA-SHA1'
            ]
          }
        ],
        responses: {},
      }
    }
  },
  security: [
    {
      'Auth 2.0': [
        'HMAC-SHA1',
        'RSA-SHA1'
      ]
    }
  ],
  securityDefinitions: {
    'Auth 2.0': {
      description: 'description',
      type: 'oauth2',
      flow: 'implicit',
      authorizationUrl: 'http://name.com',
      tokenUrl: 'http://name.com',
      scopes: {
        'HMAC-SHA1': '',
        'RSA-SHA1': ''
      }
    },
    'Basic Auth': {
      'type': 'basic',
      'description': 'description'
    }
  }
};