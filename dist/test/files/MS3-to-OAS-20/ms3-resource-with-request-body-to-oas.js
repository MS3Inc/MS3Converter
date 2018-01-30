"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3ResourceWithRequestBody = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    'dataTypes': [
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schemaName',
            'default': 'default',
            '__id': 'd0c35029-b545-4ce5-ba73-52b03910a382'
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
                    'body': [
                        {
                            'contentType': 'application/json',
                            'selectedExamples': [
                                '9abcf4a4-98f1-47d9-adaf-b6934c2b30da',
                                '9abcf4a4-98f1-47d9-adaf-b6934c2b30db'
                            ],
                            'type': 'd0c35029-b545-4ce5-ba73-52b03910a382'
                        },
                        {
                            'contentType': 'application/xml',
                            'selectedExamples': [
                                '9abcf4a4-98f1-47d9-adaf-b6934c2b30da'
                            ],
                            'type': 'd0c35029-b545-4ce5-ba73-52b03910a382'
                        }
                    ]
                }
            ],
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
        }
    ]
};
exports.oasResourceWithRequestBody = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    host: 'params',
    basePath: '/',
    paths: {
        '/res': {
            get: {
                operationId: 'RES_GET',
                parameters: [
                    {
                        in: 'body',
                        name: 'schemaName',
                        schema: {
                            '$ref': '#/definitions/schemaName'
                        }
                    }
                ],
                responses: {}
            }
        }
    },
    definitions: {
        'schemaName': {
            '$ref': './schemas/schemaName.json#schemaName'
        }
    }
};
//# sourceMappingURL=ms3-resource-with-request-body-to-oas.js.map