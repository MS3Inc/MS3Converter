"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oasDefinitions = {
    swagger: '2.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '2.0',
    },
    host: 'base.uri',
    basePath: '/v2',
    schemes: ['http'],
    paths: {},
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
    },
};
exports.ms3DataTypes = {
    settings: {
        title: 'params',
        baseUri: 'http://base.uri/v2',
        description: 'API description',
        version: '2.0',
        protocols: ['http']
    },
    ms3_version: '1.0',
    entityTypeName: 'api',
    securitySchemes: [],
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
        }
    ],
    resources: []
};
//# sourceMappingURL=oas-20-definitions-to-ms3.js.map