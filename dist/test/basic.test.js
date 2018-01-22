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
const convertor = require("../index");
test('Conversion should fail if from and to formats match.', () => __awaiter(this, void 0, void 0, function* () {
    const format = 'ms3_1';
    const expected = new Error(`Cannot convert from ${format} to ${format}`);
    const source = {
        entityTypeName: 'api',
        ms3_version: '1',
        settings: {
            title: 'some-api',
            baseUri: 'http://some-api.com'
        }
    };
    yield expect(convertor.convertData(source, format, format)).rejects.toMatchObject(expected);
}));
test('Conversion should fail if no proper source was passed', () => __awaiter(this, void 0, void 0, function* () {
    const expected = new Error(`Source cannot be empty`);
    yield expect(convertor.convertData(null, 'ms3_1', 'oas')).rejects.toMatchObject(expected);
}));
test('Conversion from file should fail if empty path is passed to it', () => __awaiter(this, void 0, void 0, function* () {
    const expected = new Error(`Source path cannot be empty`);
    yield expect(convertor.convertDataFromFile('', 'ms3_1', 'oas')).rejects.toMatchObject(expected);
}));
//# sourceMappingURL=basic.test.js.map