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
const ms3_settings_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-settings-to-oas");
const ms3_datatypes_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-datatypes-to-oas");
const ms3_examples_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-examples-to-oas");
const ms3_nested_resources_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-nested-resources-to-oas");
const ms3_resource_with_parameters_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-resource-with-parameters-to-oas");
const ms3_resource_with_request_body_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-resource-with-request-body-to-oas");
const ms3_resource_with_responses_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-resource-with-responses-to-oas");
const ms3_resource_with_path_parameters_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-resource-with-path-parameters-to-oas");
const ms3_baseuri_to_oas_1 = require("./files/MS3-to-OAS-20/ms3-baseuri-to-oas");
const fs_1 = require("fs");
const util_1 = require("util");
const rmdir = require("rmdir");
const path = require("path");
const uuid_1 = require("uuid");
const mkdirp = require("mkdirp2");
const mkdirPromise = util_1.promisify(mkdirp);
const fileExistsPromise = util_1.promisify(fs_1.exists);
const rmdirPromise = util_1.promisify(rmdir);
const destinationForTestResults = path.join(__dirname, '..', '..', '.tmp', 'oas-tests');
const getUniqueFolder = (stringPath) => path.join(stringPath, uuid_1.v4());
describe('ms3 to oas 20 tests', () => {
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield mkdirPromise(destinationForTestResults);
        done();
    }));
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield rmdirPromise(destinationForTestResults);
        done();
    }));
    test('MS3 settings should be converted to OAS 2.0 successfully', () => __awaiter(this, void 0, void 0, function* () {
        const options = {
            fileFormat: 'json',
            asSingleFile: true,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_settings_to_oas_1.ms3Settings, options).convert())).toEqual(ms3_settings_to_oas_1.oasSettings);
    }));
    test('MS3 datatypes should be converted to OAS 2.0 definitions successfully', () => __awaiter(this, void 0, void 0, function* () {
        const options = {
            fileFormat: 'json',
            asSingleFile: true,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_datatypes_to_oas_1.ms3DataTypes, options).convert())).toEqual(ms3_datatypes_to_oas_1.oasDataTypes);
    }));
    test('MS3 datatypes should be converted to OAS 2.0 definitions with references && external files should be created in "/schemas" folder', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        const result = yield index_1.default.create(ms3_datatypes_to_oas_1.ms3DataTypes, options).convert();
        expect(JSON.parse(result)).toEqual(ms3_datatypes_to_oas_1.oasDataTypesExternal);
        const mainFileExist = yield fileExistsPromise(path.join(destPath, 'api.json'));
        const schemasFolderExist = yield fileExistsPromise(path.join(destPath, 'schemas', 'ArrayInclude.json'));
        expect(mainFileExist && schemasFolderExist).toEqual(true);
    }));
    test('MS3 examples should be converted to OAS with references && external files should be created in "/examples" folder', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const config = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_examples_to_oas_1.ms3Examples, config).convert())).toEqual(ms3_examples_to_oas_1.oasExamples);
        const mainFileExist = yield fileExistsPromise(path.join(destPath, 'api.json'));
        const examplesFolderExist = yield fileExistsPromise(path.join(destPath, 'examples', 'exampleJSON.json'));
        expect(mainFileExist && examplesFolderExist).toEqual(true);
    }));
    test('MS3 security schemes should be converted to OAS 2.0 successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_datatypes_to_oas_1.ms3DataTypes, options).convert())).toEqual(ms3_datatypes_to_oas_1.oasDataTypesExternal);
    }));
    test('MS3 nested resources should be converted to OAS 2.0 successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_nested_resources_to_oas_1.ms3NestedResources, options).convert())).toEqual(ms3_nested_resources_to_oas_1.oasNestedResources);
    }));
    test('MS3 resource with parameters should be converted to OAS 2.0 successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_resource_with_parameters_to_oas_1.ms3ResourceWithParameters, options).convert())).toEqual(ms3_resource_with_parameters_to_oas_1.oasResourceWithParameters);
    }));
    test('MS3 resource with request body should be converted to OAS 2.0 successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_resource_with_request_body_to_oas_1.ms3ResourceWithRequestBody, options).convert())).toEqual(ms3_resource_with_request_body_to_oas_1.oasResourceWithRequestBody);
    }));
    test('MS3 resource with responses should be converted to OAS 2.0 successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_resource_with_responses_to_oas_1.ms3ResourceWithResponses, options).convert())).toEqual(ms3_resource_with_responses_to_oas_1.oasResourceWithResponses);
    }));
    test('MS3 resource with responses should be converted to OAS 2.0 with inline examples successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: true,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_resource_with_responses_to_oas_1.ms3ResourceWithResponses, options).convert())).toEqual(ms3_resource_with_responses_to_oas_1.oasResourceWithResponsesAndInlineExamples);
    }));
    test('MS3 resource with responses should be converted to OAS 2.0 with inline examples successfully', () => __awaiter(this, void 0, void 0, function* () {
        const destPath = getUniqueFolder(destinationForTestResults);
        yield mkdirPromise(destPath);
        const options = {
            fileFormat: 'json',
            asSingleFile: false,
            destinationPath: destPath,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_resource_with_path_parameters_to_oas_1.ms3ResourceWithPathParameters, options).convert())).toEqual(ms3_resource_with_path_parameters_to_oas_1.oasResourceWithPathParameters);
    }));
    test('MS3 baseUri should be converted to host and basePath', () => __awaiter(this, void 0, void 0, function* () {
        const options = {
            fileFormat: 'json',
            asSingleFile: true,
            oasVersion: '2.0'
        };
        expect(JSON.parse(yield index_1.default.create(ms3_baseuri_to_oas_1.ms3APIBaseUri, options).convert())).toEqual(ms3_baseuri_to_oas_1.OASApiHostAndBasePath);
    }));
});
//# sourceMappingURL=ms3-to-oas-20.test.js.map