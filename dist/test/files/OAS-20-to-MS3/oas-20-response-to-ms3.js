"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms3ResourceWithResponses = {
    settings: {
        title: 'params',
        baseUri: 'http://params/',
        version: '2.0',
        protocols: ['HTTP']
    },
    dataTypes: [],
    securitySchemes: [],
    ms3_version: '1.0',
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
                            'body': [],
                            'headers': [
                                {
                                    'displayName': 'header',
                                    'description': 'description',
                                    'type': 'number',
                                    'example': 3,
                                    'default': 5,
                                    'repeat': false,
                                    'required': false
                                },
                                {
                                    'displayName': 'header2',
                                    'description': 'description2',
                                    'type': 'number',
                                    'example': 3,
                                    'default': 5,
                                    'repeat': false,
                                    'required': false
                                }
                            ],
                        }
                    ],
                }
            ],
            '__id': 'uuid'
        }
    ]
};
exports.oasResourceWithResponsesAndInlineExamples = {
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
                        schema: {
                            '$ref': '#/definitions/schema'
                        },
                        examples: {
                            'application/json': {
                                'content': {}
                            }
                        },
                        headers: {
                            'header': {
                                description: 'description',
                                type: 'number',
                                default: 5,
                            },
                            'header2': {
                                description: 'description2',
                                type: 'number',
                                default: 5,
                            }
                        }
                    },
                    '201': {
                        description: 'description',
                        schema: {
                            '$ref': '#/definitions/schema'
                        },
                        examples: {
                            'application/xml': {
                                content: '<xml></xml>'
                            }
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
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=oas-20-response-to-ms3.js.map