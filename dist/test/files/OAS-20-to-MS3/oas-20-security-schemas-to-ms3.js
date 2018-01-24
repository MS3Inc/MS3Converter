"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms3SecuritySchemes = {
    settings: {
        title: 'params',
        baseUri: 'http://params/',
        version: '2.0',
        securedBy: ['uuid'],
        protocols: ['HTTP']
    },
    ms3_version: '1.0',
    entityTypeName: 'api',
    dataTypes: [],
    resources: [
        {
            __id: 'uuid',
            path: '/pet',
            methods: [{
                    name: 'POST',
                    active: true,
                    description: 'MyDescription',
                    responses: [],
                    securedBy: ['uuid']
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
exports.oasSecuritySchemes = {
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
//# sourceMappingURL=oas-20-security-schemas-to-ms3.js.map