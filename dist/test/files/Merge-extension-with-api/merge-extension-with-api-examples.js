"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalProjectWithExamples = {
    'apro_version': apro_version_1.default,
    'settings': {
        'extends': {
            'entityTypeName': 'api',
            'apro_version': apro_version_1.default,
            'settings': {
                'baseUri': 'http://mergeAPI',
                'title': 'Merge API',
                'description': 'description from API'
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
                    'name': 'api trait',
                    '__id': 'api-trait-id-1',
                    'body': [
                        {
                            'contentType': 'application/json',
                            'selectedExamples': [
                                'api-example-id-2'
                            ]
                        }
                    ]
                }
            ],
            'examples': [
                {
                    'title': 'example in API',
                    'content': '{}',
                    'format': 'json',
                    '__id': 'api-example-id-1'
                },
                {
                    'title': 'example',
                    'content': '<xml></xml>',
                    'format': 'xml',
                    '__id': 'api-example-id-2',
                    'annotations': [
                        {
                            'name': 'annotation',
                            'description': 'desc',
                            'type': 'string',
                            'value': 'value'
                        }
                    ]
                }
            ],
        },
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
    },
    'entityTypeName': 'extension',
    'traits': [
        {
            'name': 'ext trait',
            '__id': 'ext-trait-id-1',
            'body': [
                {
                    'contentType': 'application/json',
                    'selectedExamples': [
                        'ext-example-id-2'
                    ]
                }
            ]
        }
    ],
    'examples': [
        {
            'title': 'example in EXT',
            'content': '{}',
            'format': 'json',
            '__id': 'ext-example-id-1'
        },
        {
            'title': 'example',
            'content': '<xml></xml>',
            'format': 'xml',
            '__id': 'ext-example-id-2',
            'annotations': [
                {
                    'name': 'annotation',
                    'description': 'description',
                    'type': 'string',
                    'value': 'value from EXT'
                }
            ]
        }
    ],
    'annotationTypes': [
        {
            'name': 'annotation',
            'description': 'description',
            'type': 'string'
        }
    ],
};
exports.resultProjectWithExamples = {
    'apro_version': apro_version_1.default,
    'settings': {
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
        'description': 'description from API'
    },
    'traits': [
        {
            'name': 'ext trait',
            '__id': 'ext-trait-id-1',
            'body': [
                {
                    'contentType': 'application/json',
                    'selectedExamples': [
                        'ext-example-id-2'
                    ]
                }
            ]
        },
        {
            'name': 'api trait',
            '__id': 'api-trait-id-1',
            'body': [
                {
                    'contentType': 'application/json',
                    'selectedExamples': [
                        'ext-example-id-2'
                    ]
                }
            ]
        }
    ],
    'examples': [
        {
            'title': 'example in EXT',
            'content': '{}',
            'format': 'json',
            '__id': 'ext-example-id-1'
        },
        {
            'title': 'example',
            'content': '<xml></xml>',
            'format': 'xml',
            '__id': 'ext-example-id-2',
            'annotations': [
                {
                    'name': 'annotation',
                    'description': 'description',
                    'type': 'string',
                    'value': 'value from EXT'
                }
            ]
        },
        {
            'title': 'example in API',
            'content': '{}',
            'format': 'json',
            '__id': 'api-example-id-1'
        }
    ],
    'annotationTypes': [
        {
            'name': 'annotation',
            'description': 'description',
            'type': 'string'
        }
    ],
    'entityTypeName': 'api'
};
//# sourceMappingURL=merge-extension-with-api-examples.js.map