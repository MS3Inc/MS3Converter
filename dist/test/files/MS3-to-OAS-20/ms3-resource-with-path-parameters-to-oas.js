"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms3ResourceWithPathParameters = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    ms3_version: '1.0.1',
    entityTypeName: 'api',
    'resources': [
        {
            'path': '/res',
            'name': 'res',
            'pathVariables': [
                {
                    'displayName': 'path',
                    'type': 'string',
                    'description': 'description',
                    'pattern': '.*',
                    'default': '',
                    'example': 'example string',
                    'repeat': false,
                    'required': true,
                    'enum': [
                        'enum1',
                        'enum2'
                    ],
                    'minLength': 2,
                    'maxLength': 10
                }
            ],
            'methods': [],
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
        }
    ]
};
exports.oasResourceWithPathParameters = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    host: 'params',
    basePath: '/',
    paths: {
        '/res': {
            parameters: [
                {
                    name: 'path',
                    in: 'path',
                    description: 'description',
                    type: 'string',
                    pattern: '.*',
                    required: true,
                    enum: [
                        'enum1',
                        'enum2'
                    ],
                    minLength: 2,
                    maxLength: 10
                }
            ]
        }
    }
};
//# sourceMappingURL=ms3-resource-with-path-parameters-to-oas.js.map