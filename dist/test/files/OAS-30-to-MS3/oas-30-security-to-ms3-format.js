"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms3SecuredBy = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://base.uri',
        'description': 'API description',
        'version': '3.0',
        'securedBy': ['uuid']
    },
    'ms3_version': '1.0',
    'entityTypeName': 'api',
    'dataTypes': [],
    'examples': [],
    'resources': [
        {
            __id: 'uuid',
            path: '/res',
            methods: [{
                    name: 'GET',
                    active: true,
                    description: 'desc',
                    securedBy: ['uuid'],
                    responses: [
                        {
                            code: '200',
                            description: 'a pet to be returned'
                        }
                    ]
                }]
        }
    ],
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
exports.oas_security = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0'
    },
    security: [
        {
            'Auth 2.0': [
                'HMAC-SHA1',
                'RSA-SHA1'
            ]
        }
    ],
    paths: {
        '/res': {
            get: {
                operationId: 'RES_GET',
                description: 'desc',
                security: [
                    {
                        'Auth 2.0': [
                            'HMAC-SHA1',
                            'RSA-SHA1'
                        ]
                    }
                ],
                responses: {
                    '200': {
                        'description': 'a pet to be returned'
                    },
                }
            },
        }
    },
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
//# sourceMappingURL=oas-30-security-to-ms3-format.js.map