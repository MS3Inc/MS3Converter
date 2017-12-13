"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalBasicAndDigestAuth = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'ms3_version': '1.0.1',
    'entityTypeName': 'api',
    'securitySchemes': [
        {
            'name': 'Basic Auth',
            'type': 'Basic Authentication',
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
exports.resultBasicAndDigestAuth = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0'
    },
    paths: {},
    components: {
        securitySchemes: {
            'Basic Auth': {
                type: 'http',
                scheme: 'basic'
            }
        }
    }
};
//# sourceMappingURL=Basic-and-Digest-auth.js.map