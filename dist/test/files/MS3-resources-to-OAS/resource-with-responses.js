"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalResourceWithResponses = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'apro_version': apro_version_1.default,
    'entityTypeName': 'api',
    'dataTypes': [
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema',
            'default': 'default',
            '__id': 'd0c35029-b545-4ce5-ba73-52b03910a382'
        }
    ],
    'examples': [
        {
            'title': 'ex',
            'content': '{}',
            'format': 'json',
            '__id': '9abcf4a4-98f1-47d9-adaf-b6934c2b30da'
        },
        {
            'title': 'ex2',
            'content': '<xml></xml>',
            'format': 'xml',
            '__id': '9abcf4a4-98f1-47d9-adaf-b6934c2b30db'
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
                    'responses': [
                        {
                            'code': '200',
                            'body': [
                                {
                                    'contentType': 'application/json',
                                    'selectedExamples': [
                                        '9abcf4a4-98f1-47d9-adaf-b6934c2b30da'
                                    ],
                                    'type': 'd0c35029-b545-4ce5-ba73-52b03910a382'
                                }
                            ],
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
                        },
                        {
                            'code': '201',
                            'body': [
                                {
                                    'contentType': 'application/json',
                                    'selectedExamples': [
                                        '9abcf4a4-98f1-47d9-adaf-b6934c2b30da'
                                    ],
                                    'type': 'd0c35029-b545-4ce5-ba73-52b03910a382'
                                }
                            ]
                        }
                    ],
                }
            ],
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
        }
    ]
};
exports.resultResourceWithResponses = {
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
                responses: {
                    '200': {
                        description: 'description',
                        content: {
                            'application/json': {
                                schema: {
                                    '$ref': '#/components/schemas/schema'
                                },
                                examples: {
                                    'ex': {
                                        '$ref': '#/components/examples/ex'
                                    }
                                }
                            }
                        },
                        headers: {
                            'header': {
                                description: 'description',
                                required: true,
                                schema: {
                                    default: 5,
                                    type: 'long'
                                }
                            },
                            'header2': {
                                description: 'description2',
                                required: true,
                                schema: {
                                    default: 5,
                                    type: 'long'
                                }
                            }
                        }
                    },
                    '201': {
                        description: 'description',
                        content: {
                            'application/json': {
                                schema: {
                                    '$ref': '#/components/schemas/schema'
                                },
                                examples: {
                                    'ex': {
                                        '$ref': '#/components/examples/ex'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            'schema': {
                'default': 'default',
                'description': 'desc',
                'title': 'schema',
                'type': 'string',
            }
        },
        examples: {
            'ex': {
                value: {}
            },
            'ex2': {
                value: '<xml></xml>'
            }
        }
    }
};
//# sourceMappingURL=resource-with-responses.js.map