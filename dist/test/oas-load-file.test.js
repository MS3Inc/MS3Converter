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
const loader_1 = require("./../oas/loader");
const path = require("path");
test('Should fail with incorrect JSON format', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'wrong-json.json');
    return expect(loader_1.default.create(filePath).load()).rejects.toBeDefined();
}));
test('Should fail with incorrect file extension', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'wrong-json.ms3');
    return expect(loader_1.default.create(filePath).load()).rejects.toBeDefined();
}));
test('Yaml swagger file should load without errors', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.yaml');
    let error;
    try {
        yield loader_1.default.create(filePath).load();
    }
    catch (err) {
        error = err.message;
    }
    expect(error).toBe(undefined);
}));
test('Json swagger file should load without errors', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.json');
    let error;
    try {
        yield loader_1.default.create(filePath).load();
    }
    catch (err) {
        error = err.message;
    }
    expect(error).toBe(undefined);
}));
test('Zip swagger file should load without errors', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.zip');
    let error;
    try {
        yield loader_1.default.create(filePath).load();
    }
    catch (err) {
        error = err.message;
    }
    expect(error).toBe(undefined);
}));
test('Should correctly parse definitions', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger.zip');
    const api = yield loader_1.default.create(filePath).load();
    expect(api.definitions[0]).toEqual({
        name: 'dataType',
        content: '{\n  "type": "object"\n}\n'
    });
}));
test('Zip arch with custom yaml main name should load without errors', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger_custom_main_name_yaml.zip');
    let error;
    try {
        yield loader_1.default.create(filePath).load();
    }
    catch (err) {
        error = err.message;
    }
    expect(error).toBe(undefined);
}));
test('Zip arch with custom json main name should load without errors', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'swagger_custom_main_name_json.zip');
    let error;
    try {
        yield loader_1.default.create(filePath).load();
    }
    catch (err) {
        error = err.message;
    }
    expect(error).toBe(undefined);
}));
//# sourceMappingURL=oas-load-file.test.js.map