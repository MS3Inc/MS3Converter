"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms3SecuritySchemasResult = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://base.uri',
        'description': 'API description',
        'version': '3.0'
    },
    'ms3_version': '1.0',
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
exports.oas_security_schemas = {
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
//# sourceMappingURL=oas-30-security-schemas-to-ms3.js.map