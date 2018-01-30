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
const apro_version_1 = require("../apro_version");
const fileExistsPromise = util_1.promisify(fs_1.exists);
const rmdirPromise = util_1.promisify(rmdir);
const writeFilePromise = util_1.promisify(fs_1.writeFile);
const project = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api'
};
test('MS3 settings should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const expectedResult = {
        openapi: '3.0',
        info: {
            title: 'params',
            description: 'API description',
            version: '3.0',
        },
        servers: [{
                url: 'http://params'
            }],
        components: {},
        paths: {}
    };
    expect(JSON.parse(yield index_1.default.create(project).convert())).toEqual(expectedResult);
}));
test('MS3 settings to OAS conversion should fail with "library" entity type', () => __awaiter(this, void 0, void 0, function* () {
    const library = {
        settings: {
            title: 'params',
            usage: 'dsdsd',
            baseUri: 'http://params',
        },
        apro_version: apro_version_1.default,
        entityTypeName: 'library'
    };
    try {
        yield index_1.default.create(library).convert();
    }
    catch (err) {
        expect(err).toEqual(new Error('Library can not be converted to swagger.'));
    }
}));
test('Should create api.yaml file', () => __awaiter(this, void 0, void 0, function* () {
    const options = {
        destinationPath: './',
        asSingleFile: true,
        fileFormat: 'yaml'
    };
    yield index_1.default.create(project, options).convert();
    const fileExist = yield fileExistsPromise(`./api.yaml`);
    yield rmdirPromise('./api.yaml');
    expect(fileExist).toEqual(true);
}));
test('Should create api.json file', () => __awaiter(this, void 0, void 0, function* () {
    const options = {
        destinationPath: './',
        asSingleFile: true,
        fileFormat: 'json'
    };
    yield index_1.default.create(project, options).convert();
    const fileExist = yield fileExistsPromise(`./api.json`);
    yield rmdirPromise('./api.json');
    expect(fileExist).toEqual(true);
}));
//# sourceMappingURL=ms3-settings-to-oas.test.js.map