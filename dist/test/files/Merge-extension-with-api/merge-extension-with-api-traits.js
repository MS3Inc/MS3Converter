"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalProjectWithTraits = {
    'ms3_version': '1.0.1',
    'settings': {
        'extends': {
            'entityTypeName': 'api',
            'ms3_version': '1.0.1',
            'settings': {
                'baseUri': 'http://mergeAPI',
                'title': 'Merge API',
            },
            'annotationTypes': [
                {
                    'name': 'annotation',
                    'description': 'desc',
                    'type': 'string'
                }
            ],
            'traits': [
                {
                    'name': 'trait',
                    'headers': [
                        {
                            'displayName': 'number',
                            'type': 'number',
                            'minLength': 2,
                            'maxLength': 10
                        },
                        {
                            'displayName': 'string',
                            'type': 'string',
                            'pattern': '.*',
                            'minLength': 2,
                            'maxLength': 10
                        }
                    ],
                    'responses': [
                        {
                            'code': '101',
                            'description': 'should be overwritten'
                        }
                    ],
                    '__id': 'api-trait-id',
                }
            ]
        },
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
    },
    'entityTypeName': 'api',
    'annotationTypes': [
        {
            'name': 'annotation',
            'description': 'description',
            'type': 'string'
        }
    ],
    'traits': [
        {
            'name': 'trait',
            'description': 'description',
            'queryParameters': [
                {
                    'displayName': 'integer',
                    'type': 'integer',
                    'description': 'description',
                    'default': 1,
                    'minimum': 2,
                    'maximum': 1,
                }
            ],
            'headers': [
                {
                    'displayName': 'number',
                    'type': 'number',
                    'minLength': 2,
                    'maxLength': 10
                },
                {
                    'displayName': 'string',
                    'type': 'integer',
                    'minLength': 3,
                    'maxLength': 11
                }
            ],
            'responses': [
                {
                    'code': '101',
                    'description': 'should overwrite'
                }
            ],
            '__id': 'ext-trait-id',
        }
    ]
};
exports.resultProjectWithTraits = {
    'ms3_version': '1.0.1',
    'settings': {
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
    },
    'annotationTypes': [
        {
            'name': 'annotation',
            'description': 'description',
            'type': 'string'
        }
    ],
    'traits': [
        {
            'name': 'trait',
            'description': 'description',
            'queryParameters': [
                {
                    'displayName': 'integer',
                    'type': 'integer',
                    'description': 'description',
                    'default': 1,
                    'minimum': 2,
                    'maximum': 1,
                }
            ],
            'headers': [
                {
                    'displayName': 'number',
                    'type': 'number',
                    'minLength': 2,
                    'maxLength': 10
                },
                {
                    'displayName': 'string',
                    'type': 'integer',
                    'minLength': 3,
                    'maxLength': 11
                }
            ],
            'responses': [
                {
                    'code': '101',
                    'description': 'should overwrite'
                }
            ],
            '__id': 'ext-trait-id',
        }
    ],
    'entityTypeName': 'api'
};
//# sourceMappingURL=merge-extension-with-api-traits.js.map