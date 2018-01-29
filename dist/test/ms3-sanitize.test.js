"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ms3_sanitizer_1 = require("./../ms3/ms3-sanitizer");
const Project_with_datatypes_1 = require("./files/Project-with-datatypes");
const Project_with_resources_1 = require("./files/Project-with-resources");
const Project_with_security_schemes_1 = require("./files/Project-with-security-schemes");
const Project_with_traits_1 = require("./files/Project-with-traits");
const apro_version_1 = require("../apro_version");
test('MS3 API settings should be sanitized successfully', () => {
    const project = {
        settings: {
            securedBy: [],
            baseUriParameters: [],
            protocols: [
                'HTTP'
            ],
            annotations: [],
            title: 'params',
            description: 'dsdsd',
            baseUri: 'http://params',
            version: '',
            mediaType: ''
        },
        apro_version: apro_version_1.default,
        entityTypeName: 'api'
    };
    const expectedResult = {
        settings: {
            protocols: [
                'HTTP'
            ],
            title: 'params',
            description: 'dsdsd',
            baseUri: 'http://params'
        },
        apro_version: apro_version_1.default,
        entityTypeName: 'api'
    };
    expect(ms3_sanitizer_1.default.create(project).sanitize()).toEqual(expectedResult);
});
test('MS3 API data types should be sanitized successfully', () => {
    expect(ms3_sanitizer_1.default.create(Project_with_datatypes_1.originalProject).sanitize()).toEqual(Project_with_datatypes_1.resultProject);
});
test('MS3 API resources should be sanitized successfully', () => {
    expect(ms3_sanitizer_1.default.create(Project_with_resources_1.originalProject).sanitize()).toEqual(Project_with_resources_1.resultProject);
});
test('MS3 API security schemes should be sanitized successfully', () => {
    expect(ms3_sanitizer_1.default.create(Project_with_security_schemes_1.originalProject).sanitize()).toEqual(Project_with_security_schemes_1.resultProject);
});
test('MS3 API resources types should be sanitized successfully', () => {
    expect(ms3_sanitizer_1.default.create(Project_with_security_schemes_1.originalProject).sanitize()).toEqual(Project_with_security_schemes_1.resultProject);
});
test('MS3 API traits should be sanitized successfully', () => {
    expect(ms3_sanitizer_1.default.create(Project_with_traits_1.originalProject).sanitize()).toEqual(Project_with_traits_1.resultProject);
});
test('MS3 API examples should be sanitized successfully', () => {
    const originalExamplesProject = {
        'settings': {
            'title': 'params',
            'baseUri': 'http://params'
        },
        'apro_version': apro_version_1.default,
        'entityTypeName': 'api',
        'examples': [
            {
                'title': 'example',
                'content': '{}',
                'format': 'json',
                'annotations': [],
                '__id': 'ee86a166-8725-4757-b90c-8c3c3b8fffcf'
            }
        ]
    };
    const resultExamplesProject = {
        'settings': {
            'title': 'params',
            'baseUri': 'http://params'
        },
        'apro_version': apro_version_1.default,
        'entityTypeName': 'api',
        'examples': [
            {
                'title': 'example',
                'content': '{}',
                'format': 'json',
                '__id': 'ee86a166-8725-4757-b90c-8c3c3b8fffcf'
            }
        ]
    };
    expect(ms3_sanitizer_1.default.create(originalExamplesProject).sanitize()).toEqual(resultExamplesProject);
});
test('MS3 API documentation should be sanitized successfully', () => {
    const originalDocumentationProject = {
        'settings': {
            'title': 'params',
            'baseUri': 'http://params'
        },
        'apro_version': apro_version_1.default,
        'entityTypeName': 'api',
        'documentation': [
            {
                'name': 'doc',
                'description': '',
                'annotations': [
                    {
                        'name': 'string',
                        'type': 'string',
                        'enum': [],
                        'pattern': '',
                        'value': ''
                    }
                ],
                '__id': 'd60863bf-0705-49d4-9584-cff043d2efd2'
            }
        ],
    };
    const resultDocumentationProject = {
        'settings': {
            'title': 'params',
            'baseUri': 'http://params'
        },
        'apro_version': apro_version_1.default,
        'entityTypeName': 'api',
        'documentation': [
            {
                'name': 'doc',
                'annotations': [
                    {
                        'name': 'string',
                        'type': 'string'
                    }
                ],
                '__id': 'd60863bf-0705-49d4-9584-cff043d2efd2'
            }
        ],
    };
    expect(ms3_sanitizer_1.default.create(originalDocumentationProject).sanitize()).toEqual(resultDocumentationProject);
});
test('MS3 API documentation should be sanitized successfully', () => {
    const originalAnnotationTypesProject = {
        'settings': {
            'title': 'params',
            'baseUri': 'http://params'
        },
        'apro_version': apro_version_1.default,
        'entityTypeName': 'api',
        'annotationTypes': [
            {
                'name': 'string',
                'type': 'string',
                'enum': [],
                'pattern': ''
            },
            {
                'name': 'name',
                'type': 'object',
                'enum': [],
                'pattern': '',
                'properties': [
                    {
                        'name': 'default',
                        'type': 'string',
                        'required': false,
                        'enum': []
                    },
                    {
                        'name': 'default',
                        'type': 'integer',
                        'required': false,
                        'enum': [],
                        'pattern': ''
                    }
                ],
                'allowedTargets': [
                    'Method'
                ]
            }
        ]
    };
    const resultAnnotationTypesProject = {
        'settings': {
            'title': 'params',
            'baseUri': 'http://params'
        },
        'apro_version': apro_version_1.default,
        'entityTypeName': 'api',
        'annotationTypes': [
            {
                'name': 'string',
                'type': 'string'
            },
            {
                'name': 'name',
                'type': 'object',
                'properties': [
                    {
                        'name': 'default',
                        'type': 'string',
                        'required': false
                    },
                    {
                        'name': 'default',
                        'type': 'integer',
                        'required': false
                    }
                ],
                'allowedTargets': [
                    'Method'
                ]
            }
        ]
    };
    expect(ms3_sanitizer_1.default.create(originalAnnotationTypesProject).sanitize()).toEqual(resultAnnotationTypesProject);
});
//# sourceMappingURL=ms3-sanitize.test.js.map