"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oasPathsWithResponses = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0',
    },
    components: {
        schemas: {
            'mySchema': {
                'type': 'string',
                'description': '123',
                'example': '2',
                'default': '3',
                'pattern': '2',
                'minLength': 1,
                'maxLength': 4,
                'enum': [
                    '123'
                ]
            },
        }
    },
    paths: {
        '/res': {
            get: {
                operationId: 'RES_GET',
                description: 'desc',
                responses: {
                    '200': {
                        'description': 'a pet to be returned',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/mySchema',
                                },
                                'examples': {
                                    'cat': {
                                        'summary': 'An example of a cat',
                                        'value': {
                                            'name': 'Fluffy',
                                            'petType': 'Cat',
                                            'color': 'White',
                                            'gender': 'male',
                                            'breed': 'Persian'
                                        }
                                    },
                                    'dog': {
                                        'summary': 'An example of a dog',
                                        'value': {
                                            'name': 'Fluffy',
                                            'petType': 'Dog',
                                            'color': 'Black',
                                            'gender': 'male',
                                            'breed': 'Dog'
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            },
        }
    }
};
exports.ms3ResourcesWithResponses = {
    settings: {
        title: 'params',
        baseUri: 'http://base.uri',
        description: 'API description',
        version: '3.0'
    },
    ms3_version: '1.0',
    entityTypeName: 'api',
    resources: [
        {
            __id: 'uuid',
            path: '/res',
            methods: [
                {
                    name: 'GET',
                    active: true,
                    description: 'desc',
                    responses: [
                        {
                            code: '200',
                            description: 'a pet to be returned',
                            body: [
                                {
                                    contentType: 'application/json',
                                    type: 'uuid',
                                    selectedExamples: ['uuid', 'uuid']
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    examples: [
        {
            '__id': 'uuid',
            'title': 'cat',
            'format': 'json',
            'content': '{\"name\":\"Fluffy\",\"petType\":\"Cat\",\"color\":\"White\",\"gender\":\"male\",\"breed\":\"Persian\"}',
        },
        {
            '__id': 'uuid',
            'title': 'dog',
            'format': 'json',
            'content': '{\"name\":\"Fluffy\",\"petType\":\"Dog\",\"color\":\"Black\",\"gender\":\"male\",\"breed\":\"Dog\"}'
        }
    ],
    dataTypes: [
        {
            'type': 'string',
            'description': '123',
            'name': 'mySchema',
            'example': '2',
            'default': '3',
            'pattern': '2',
            'minLength': 1,
            'maxLength': 4,
            'enum': [
                '123'
            ],
            '__id': 'uuid'
        }
    ]
};
//# sourceMappingURL=oas-30-resource-responses-to-ms3.js.map