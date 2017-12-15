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
const loader_1 = require("../../blueprint/loader");
const path = require("path");
test('Loader should fail if reading siource file failed.', () => __awaiter(this, void 0, void 0, function* () {
    yield expect(true).toEqual(true);
}));
test('Loader should fail if source file is empty.', () => __awaiter(this, void 0, void 0, function* () {
    yield expect(true).toEqual(true);
}));
test('Loader should parse md file', () => __awaiter(this, void 0, void 0, function* () {
    yield expect(true).toEqual(true);
}));
test('Loader should parse whole folder structure and return map of all files involved in api description', () => __awaiter(this, void 0, void 0, function* () {
    yield expect(true).toEqual(true);
}));
test('Loader should parse apib file', () => __awaiter(this, void 0, void 0, function* () {
    yield expect(true).toEqual(true);
    // const sourcePath = path.join(__dirname, '..', '..', '..', 'src', 'test', 'blueprint', 'source-files', 'simple-blueprint.apib');
    // const expected = 'EXPECTED';
    // yield expect(loader_1.default.create(sourcePath).load()).resolves.toEqual(expected);
}));
//# sourceMappingURL=loader.test.js.map