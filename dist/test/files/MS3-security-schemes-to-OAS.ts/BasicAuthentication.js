"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalBasicAuth = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'apro_version': apro_version_1.default,
    'entityTypeName': 'api',
    'securitySchemes': [
        {
            'name': 'Basic Auth',
            'type': 'Basic Authentication',
            'description': 'description',
            'describedBy': {
                'headers': [
                    {
                        'displayName': 'header',
                        'type': 'date',
                        'repeat': false,
                        'required': false
                    },
                    {
                        'displayName': 'header2',
                        'type': 'integer',
                        'repeat': false,
                        'required': false,
                    }
                ],
                'queryParameters': [
                    {
                        'displayName': 'qparam',
                        'type': 'integer',
                        'example': 2,
                        'default': 3,
                        'repeat': false,
                        'required': false
                    }
                ],
                'responses': [
                    {
                        'code': '200',
                        'description': 'desc'
                    }
                ]
            },
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
        }
    ]
};
exports.resultBasicAuth = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0'
    },
    servers: [{
            url: 'http://params'
        }],
    paths: {},
    components: {
        securitySchemes: {
            'Basic Auth': {
                description: 'description',
                type: 'http',
                scheme: 'basic'
            }
        }
    }
};
//# sourceMappingURL=BasicAuthentication.js.map