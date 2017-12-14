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
const Project_with_examples_1 = require("./files/Project-with-examples");
const fs_1 = require("fs");
const util_1 = require("util");
const rmdir = require("rmdir");
const fileExistsPromise = util_1.promisify(fs_1.exists);
const rmdirPromise = util_1.promisify(rmdir);
test('MS3 examples should be converted to OAS and included inline successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(JSON.parse(yield index_1.default.create(Project_with_examples_1.originalExamples).convert())).toEqual(Project_with_examples_1.resultExamples);
}));
test('MS3 examples should be converted to OAS with references && external files should be created in "/examples" folder', () => __awaiter(this, void 0, void 0, function* () {
    const config = {
        fileFormat: 'json',
        asSingleFile: false,
        destinationPath: './'
    };
    expect(JSON.parse(yield index_1.default.create(Project_with_examples_1.originalExamples, config).convert())).toEqual(Project_with_examples_1.resultExamplesWithReferences);
    const mainFileExist = yield fileExistsPromise('./api.json');
    const examplesFolderExist = yield fileExistsPromise('./examples/exampleJSON.json');
    yield rmdirPromise('./api.json');
    yield rmdirPromise('./examples');
    expect(mainFileExist && examplesFolderExist).toEqual(true);
}));
//# sourceMappingURL=ms3-examples-to-oas.test.js.map