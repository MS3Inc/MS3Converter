"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms3SecuritySchemes = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    ms3_version: '1.0.1',
    entityTypeName: 'api',
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
            'describedBy': {},
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
        },
        {
            'name': 'Basic Auth',
            'type': 'Basic Authentication',
            'description': 'description',
            'describedBy': {},
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
        },
        {
            'name': 'Digest Auth',
            'type': 'Digest Authentication',
            'describedBy': {},
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
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
    paths: {},
    securityDefinitions: {
        'Auth 2.0': {
            description: 'description',
            type: 'oauth2',
            flow: 'implicit',
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
//# sourceMappingURL=ms3-securityschemes-to-oas.js.map