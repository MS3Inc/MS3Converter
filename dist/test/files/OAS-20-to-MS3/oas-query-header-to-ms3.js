"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oasHeaderQuery = {
    swagger: '2.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '2.0',
    },
    host: 'base.uri',
    basePath: '/v2',
    schemes: ['http'],
    paths: {
        '/pet': {
            post: {
                summary: 'Add a new pet to the store',
                description: 'MyDescription',
                operationId: 'addPet',
                responses: {},
                consumes: [
                    'application/json',
                    'application/xml'
                ],
                produces: [
                    'application/xml',
                    'application/json'
                ],
                parameters: [
                    {
                        name: 'string',
                        in: 'header',
                        description: 'description',
                        required: true,
                        type: 'string',
                        default: 'default',
                        pattern: '.*',
                        enum: [
                            'enum1',
                            'enum2'
                        ],
                        minLength: 2,
                        maxLength: 10
                    },
                    {
                        name: 'randomName',
                        in: 'query',
                        description: 'Pet object that needs to be added to the store',
                        required: true,
                        type: 'string'
                    }
                ]
            }
        },
    }
};
exports.ms3HeaderQuery = {
    settings: {
        title: 'params',
        baseUri: 'http://base.uri/v2',
        description: 'API description',
        version: '2.0',
        protocols: ['http']
    },
    ms3_version: '1.0',
    entityTypeName: 'api',
    dataTypes: [],
    securitySchemes: [],
    resources: [
        {
            'path': '/pet',
            'methods': [
                {
                    'active': true,
                    'name': 'POST',
                    'description': 'MyDescription',
                    'headers': [
                        {
                            default: 'default',
                            description: 'description',
                            displayName: 'string',
                            enum: [
                                'enum1',
                                'enum2'
                            ],
                            maxLength: 10,
                            minLength: 2,
                            pattern: '.*',
                            required: true,
                            type: 'string'
                        },
                    ],
                    'queryParameters': [
                        {
                            'displayName': 'randomName',
                            'description': 'Pet object that needs to be added to the store',
                            'required': true,
                            'type': 'string'
                        }
                    ]
                }
            ],
            '__id': 'uuid'
        },
    ]
};
//# sourceMappingURL=oas-query-header-to-ms3.js.map