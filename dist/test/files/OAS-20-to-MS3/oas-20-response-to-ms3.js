"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3ResourceWithResponses = {
    settings: {
        title: 'params',
        baseUri: 'http://params/',
        version: '2.0',
        protocols: ['HTTP']
    },
    dataTypes: [{
            __id: 'uuid',
            type: 'string',
            default: 'default',
            description: 'desc',
            name: 'schema',
        }],
    securitySchemes: [],
    examples: [{
            __id: 'uuid',
            title: 'Examples-1',
            format: 'json',
            content: '{\"name\":\"Tom\"}'
        }],
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    'resources': [
        {
            'path': '/res',
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                    'responses': [
                        {
                            'code': '200',
                            'description': 'description',
                            'headers': [
                                {
                                    'displayName': 'header',
                                    'description': 'description',
                                    'type': 'number',
                                    'default': 5
                                },
                                {
                                    'displayName': 'header2',
                                    'description': 'description2',
                                    'type': 'number',
                                    'default': 5
                                }
                            ],
                            body: [{
                                    contentType: 'application/json',
                                    type: 'uuid',
                                    selectedExamples: ['uuid']
                                }]
                        }
                    ],
                }
            ],
            '__id': 'uuid'
        }
    ]
};
exports.oasResourceWithResponses = {
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
                responses: {
                    '200': {
                        description: 'description',
                        headers: {
                            'header': {
                                description: 'description',
                                type: 'number',
                                default: 5
                            },
                            'header2': {
                                description: 'description2',
                                type: 'number',
                                default: 5
                            }
                        },
                        examples: {
                            'application/json': {
                                'name': 'Tom'
                            }
                        },
                        schema: {
                            '$ref': '#/definitions/schema'
                        }
                    }
                }
            }
        }
    },
    definitions: {
        'schema': {
            'default': 'default',
            'description': 'desc',
            'title': 'schema',
            'type': 'string',
        }
    }
};
//# sourceMappingURL=oas-20-response-to-ms3.js.map