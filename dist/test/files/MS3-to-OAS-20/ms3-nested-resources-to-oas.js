"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3NestedResources = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    'resources': [
        {
            'path': '/res',
            'name': 'res',
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                },
                {
                    'active': true,
                    'name': 'POST'
                }
            ],
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
        },
        {
            'path': '/nested',
            'name': 'nested',
            'parentId': 'f068746b-acd9-40c8-af83-83a89095b0a0',
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                }
            ],
            '__id': '880ddafe-81a1-4ff3-841e-5bb80c146997'
        }
    ]
};
exports.oasNestedResources = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    host: 'params',
    basePath: '/',
    schemes: [
        'https'
    ],
    paths: {
        '/res': {
            'get': {
                operationId: 'RES_GET',
                responses: {},
            },
            'post': {
                operationId: 'RES_POST',
                responses: {},
            }
        },
        '/res/nested': {
            'get': {
                operationId: 'NESTED_GET',
                responses: {},
            }
        }
    }
};
//# sourceMappingURL=ms3-nested-resources-to-oas.js.map