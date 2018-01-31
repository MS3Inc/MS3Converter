"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3DataTypes = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    dataTypes: [
        {
            'name': 'ArrayInclude',
            'type': 'array',
            'example': 'ExampleArray',
            'maxItems': 3,
            'minItems': 1,
            'uniqueItems': true,
            'items': {
                'includes': 'c6710947-1eed-472d-a4f3-c4807c24fe6b'
            },
            '__id': 'e26ffe29-1c82-4852-a472-5f0271955793'
        },
        {
            'name': 'ObjectSchema',
            'type': 'object',
            'properties': [
                {
                    'name': 'NestedObject',
                    'type': 'object',
                    'properties': [
                        {
                            'name': 'someString',
                            'type': 'string',
                            'required': true
                        }
                    ],
                    'required': true
                },
                {
                    'name': 'StringProperty',
                    'type': 'string',
                    'description': 'Description here',
                    'example': 'Terry',
                    'default': 'Ted',
                    'pattern': 'Pattern Here',
                    'minLength': 3,
                    'maxLength': 10,
                    'enum': [
                        'Ted',
                        'Bob'
                    ],
                    'required': true
                },
                {
                    'name': 'BooleanProperty',
                    'type': 'boolean',
                    'description': 'Description here',
                    'example': false,
                    'default': true,
                    'required': true
                },
                {
                    'name': 'isNumber',
                    'type': 'number'
                },
                {
                    'name': 'isDateOnly',
                    'type': 'date-only'
                },
                {
                    'name': 'nil',
                    'type': 'nil'
                },
                {
                    'name': 'default-3',
                    'mode': 'include',
                    'required': true,
                    'includes': 'c6710947-1eed-472d-a4f3-c4807c24fe6b'
                },
                {
                    'name': 'def-4',
                    'mode': 'include',
                    'includes': '1'
                }
            ],
            '__id': 'b204580e-7b57-44b4-85fd-075fca5d68c8'
        },
        {
            'name': 'nilTop',
            'type': 'nil',
            '__id': '1'
        },
        {
            'name': 'arrayOfNil',
            'type': 'array',
            'items': {
                'type': 'nil'
            },
            '__id': '2'
        },
        {
            'name': 'arrayRefNil',
            'type': 'array',
            'items': {
                'includes': '1'
            },
            '__id': '3'
        },
        {
            'name': 'ArraySchema',
            'type': 'array',
            'example': '13',
            'maxItems': 1,
            'minItems': 1,
            'uniqueItems': true,
            'items': {
                'type': 'integer',
                'description': '1',
                'example': 3,
                'default': 2,
                'format': 'int32',
                'minimum': 1,
                'maximum': 3,
                'multipleOf': 12
            },
            '__id': 'c6710947-1eed-472d-a4f3-c4807c24fe6b'
        }
    ],
    apro_version: apro_version_1.default,
    entityTypeName: 'api'
};
exports.oasDataTypes = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    schemes: [
        'https'
    ],
    host: 'params',
    basePath: '/',
    paths: {},
    definitions: {
        'ArrayInclude': {
            'title': 'ArrayInclude',
            'type': 'array',
            'example': 'ExampleArray',
            'maxItems': 3,
            'minItems': 1,
            'uniqueItems': true,
            'items': {
                '$ref': '#/definitions/ArraySchema'
            },
        },
        'arrayRefNil': {
            'title': 'arrayRefNil',
            'type': 'array',
        },
        'ArraySchema': {
            'title': 'ArraySchema',
            'type': 'array',
            'example': '13',
            'maxItems': 1,
            'minItems': 1,
            'uniqueItems': true,
            'items': {
                'type': 'integer',
                'description': '1',
                'example': 3,
                'default': 2,
                'format': 'int32',
                'minimum': 1,
                'maximum': 3,
                'multipleOf': 12
            }
        },
        'ObjectSchema': {
            'title': 'ObjectSchema',
            'type': 'object',
            'required': [
                'NestedObject',
                'StringProperty',
                'BooleanProperty',
                'default-3',
            ],
            'properties': {
                'NestedObject': {
                    'properties': {
                        'someString': {
                            'type': 'string',
                        },
                    },
                    'required': [
                        'someString',
                    ],
                    'type': 'object',
                },
                'StringProperty': {
                    'type': 'string',
                    'description': 'Description here',
                    'example': 'Terry',
                    'default': 'Ted',
                    'pattern': 'Pattern Here',
                    'minLength': 3,
                    'maxLength': 10,
                    'enum': [
                        'Ted',
                        'Bob'
                    ]
                },
                'BooleanProperty': {
                    'type': 'boolean',
                    'description': 'Description here',
                    'example': false,
                    'default': true
                },
                'isNumber': {
                    'type': 'integer'
                },
                'isDateOnly': {
                    'type': 'date'
                },
                'ArraySchema': {
                    '$ref': '#/definitions/ArraySchema'
                }
            }
        },
        'arrayOfNil': {
            'title': 'arrayOfNil',
            'type': 'array'
        }
    }
};
exports.oasDataTypesExternal = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    schemes: [
        'https'
    ],
    host: 'params',
    basePath: '/',
    paths: {},
    definitions: {
        'ArrayInclude': {
            '$ref': './schemas/ArrayInclude.json#ArrayInclude'
        },
        'arrayRefNil': {
            '$ref': './schemas/arrayRefNil.json#arrayRefNil'
        },
        'ArraySchema': {
            '$ref': './schemas/ArraySchema.json#ArraySchema'
        },
        'ObjectSchema': {
            '$ref': './schemas/ObjectSchema.json#ObjectSchema'
        },
        'arrayOfNil': {
            '$ref': './schemas/arrayOfNil.json#arrayOfNil'
        }
    }
};
//# sourceMappingURL=ms3-datatypes-to-oas.js.map