"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.oasBody = {
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
                        in: 'body',
                        description: 'description',
                        required: true,
                        schema: {
                            '$ref': '#/definitions/Order'
                        }
                    },
                    {
                        name: 'another',
                        in: 'body',
                        description: 'description',
                        required: true,
                        schema: {
                            'type': 'string',
                            'description': 'Order Status',
                            'enum': [
                                'placed',
                                'approved',
                                'delivered'
                            ]
                        }
                    }
                ]
            }
        },
    },
    definitions: {
        'Order': {
            'type': 'object',
            'properties': {
                'id': {
                    'type': 'integer',
                    'format': 'int64'
                },
                'petId': {
                    'type': 'integer',
                    'format': 'int64'
                },
                'quantity': {
                    'type': 'integer',
                    'format': 'int32'
                },
                'shipDate': {
                    'type': 'string',
                    'format': 'int32'
                },
                'status': {
                    'type': 'string',
                    'description': 'Order Status',
                    'enum': [
                        'placed',
                        'approved',
                        'delivered'
                    ]
                },
                'complete': {
                    'type': 'boolean',
                    'default': false
                }
            }
        }
    }
};
exports.ms3Body = {
    settings: {
        title: 'params',
        baseUri: 'http://base.uri/v2',
        description: 'API description',
        version: '2.0',
        protocols: ['http']
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    securitySchemes: [],
    resources: [
        {
            'path': '/pet',
            'methods': [
                {
                    'active': true,
                    'name': 'POST',
                    'description': 'MyDescription',
                    body: [
                        {
                            'contentType': 'application/json',
                            'type': 'uuid',
                        },
                        {
                            'contentType': 'application/json',
                            'type': 'uuid',
                        }
                    ],
                    'responses': []
                }
            ],
            '__id': 'uuid'
        },
    ],
    dataTypes: [
        {
            'type': 'object',
            'properties': [
                {
                    'type': 'integer',
                    'format': 'int64',
                    'name': 'id'
                },
                {
                    'type': 'integer',
                    'format': 'int64',
                    'name': 'petId'
                },
                {
                    'type': 'integer',
                    'format': 'int32',
                    'name': 'quantity'
                },
                {
                    'type': 'string',
                    'format': 'int32',
                    'name': 'shipDate'
                },
                {
                    'type': 'string',
                    'description': 'Order Status',
                    'enum': [
                        'placed',
                        'approved',
                        'delivered'
                    ],
                    'name': 'status'
                },
                {
                    'type': 'boolean',
                    'name': 'complete'
                }
            ],
            'name': 'Order',
            '__id': 'uuid'
        },
        {
            'type': 'string',
            'description': 'Order Status',
            'enum': [
                'placed',
                'approved',
                'delivered'
            ],
            'name': 'default_name_1',
            '__id': 'uuid'
        },
    ]
};
//# sourceMappingURL=oas-20-body-to-ms3.js.map