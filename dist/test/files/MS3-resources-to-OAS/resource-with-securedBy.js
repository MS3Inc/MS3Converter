"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalResourceWithSecuredBy = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'ms3_version': '1.0.1',
    'entityTypeName': 'api',
    'securitySchemes': [
        {
            'name': 'auth20',
            'type': 'OAuth 2.0',
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a1',
            'settings': {
                'authorizationGrants': [
                    'client_credentials',
                    'implicit'
                ],
                'accessTokenUri': 'http://hey.there',
                'scopes': []
            }
        },
        {
            'name': 'Digest Auth',
            'type': 'Digest Authentication',
            'describedBy': {},
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
        }
    ],
    'resources': [
        {
            'path': '/res',
            'name': 'res',
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                    'securedBy': ['a3c8a352-2b7f-4955-839d-d980da30ae4f', 'f068746b-acd9-40c8-af83-83a89095b0a1']
                }
            ],
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
        }
    ]
};
exports.resultResourceWithSecuredBy = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0'
    },
    servers: [{
            url: 'http://params'
        }],
    paths: {
        '/res': {
            get: {
                operationId: 'RES_GET',
                responses: {},
                security: [
                    {
                        'auth20': []
                    }
                ]
            }
        }
    },
    components: {
        securitySchemes: {
            'auth20': {
                type: 'oauth2',
                flows: {
                    clientCredentials: {
                        scopes: [],
                        tokenUrl: 'http://hey.there'
                    },
                    implicit: {
                        scopes: [],
                        authorizationUrl: 'https://auth.url'
                    },
                }
            }
        }
    }
};
//# sourceMappingURL=resource-with-securedBy.js.map