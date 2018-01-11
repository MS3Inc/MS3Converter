"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../ms3/ms3-to-oas/index");
const fs_1 = require("fs");
const util_1 = require("util");
const rmdir = require("rmdir");
const path = require("path");
const uuid_1 = require("uuid");
const mkdirp = require("mkdirp2");
const fileExistsPromise = util_1.promisify(fs_1.exists);
const rmdirPromise = util_1.promisify(rmdir);
const mkdirPromise = util_1.promisify(mkdirp);
const project = {
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
    ms3_version: '1.0.1',
    entityTypeName: 'api'
};
test('MS3 schemas should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const expectedResult = {
        openapi: '3.0',
        info: {
            title: 'params',
            description: 'API description',
            version: '3.0'
        },
        servers: [{
                url: 'http://params'
            }],
        paths: {},
        components: {
            schemas: {
                'ArrayInclude': {
                    'title': 'ArrayInclude',
                    'type': 'array',
                    'example': 'ExampleArray',
                    'maxItems': 3,
                    'minItems': 1,
                    'uniqueItems': true,
                    'items': {
                        '$ref': '#/components/schemas/ArraySchema'
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
                    'properties': {
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
                            ],
                            'required': true
                        },
                        'BooleanProperty': {
                            'type': 'boolean',
                            'description': 'Description here',
                            'example': false,
                            'default': true,
                            'required': true
                        },
                        'isNumber': {
                            'type': 'long'
                        },
                        'isDateOnly': {
                            'type': 'date'
                        },
                        'ArraySchema': {
                            '$ref': '#/components/schemas/ArraySchema'
                        }
                    }
                },
                'arrayOfNil': {
                    'title': 'arrayOfNil',
                    'type': 'array'
                }
            },
        }
    };
    expect(JSON.parse(yield index_1.default.create(project).convert())).toEqual(expectedResult);
}));
test('MS3 schemas should be converted to OAS with references && external files should be created in "/schemas" folder', () => __awaiter(this, void 0, void 0, function* () {
    const expectedResult = {
        openapi: '3.0',
        info: {
            title: 'params',
            description: 'API description',
            version: '3.0'
        },
        servers: [{
                url: 'http://params'
            }],
        paths: {},
        components: {
            schemas: {
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
            },
        }
    };
    const destinationForTestResults = path.join(__dirname, '..', '..', '.tmp', 'ms3-datatypes-to-oas', uuid_1.v4());
    const config = {
        fileFormat: 'json',
        asSingleFile: false,
        destinationPath: destinationForTestResults
    };
    yield mkdirPromise(destinationForTestResults);
    expect(JSON.parse(yield index_1.default.create(project, config).convert())).toEqual(expectedResult);
    const mainFileExist = yield fileExistsPromise(path.join(destinationForTestResults, 'api.json'));
    const schemasFolderExist = yield fileExistsPromise(path.join(destinationForTestResults, 'schemas', 'ArrayInclude.json'));
    yield rmdirPromise(path.join(__dirname, '..', '..', '.tmp', 'ms3-datatypes-to-oas'));
    expect(mainFileExist && schemasFolderExist).toEqual(true);
}));
//# sourceMappingURL=ms3-datatypes-to-oas.test.js.map