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
const index_1 = require("../../../blueprint/stringify/index");
const ShouldStringMetadataAndNS = require("./files/blueprint-metadata-and-name-section-api");
const ShouldStringResourceParameters = require("./files/blueprint-resource-parameters");
const ShouldStringResourceActions = require("./files/blueprint-resource-actions");
test('Should stringify metadata and name section of blueprint document', () => __awaiter(this, void 0, void 0, function* () {
    const convertedSource = index_1.default.create(ShouldStringMetadataAndNS.source, {}).stringify();
    const expected = ShouldStringMetadataAndNS.expected;
    yield expect(convertedSource).toEqual(expected);
}));
test('Should stringify resources parameters of blueprint document', () => __awaiter(this, void 0, void 0, function* () {
    const convertedSource = index_1.default.create(ShouldStringResourceParameters.source, {}).stringify();
    const expected = ShouldStringResourceParameters.expected;
    yield expect(convertedSource).toEqual(expected);
}));
test('Should stringify resources action sections of blueprint document', () => __awaiter(this, void 0, void 0, function* () {
    const convertedSource = index_1.default.create(ShouldStringResourceActions.source, {}).stringify();
    const expected = ShouldStringResourceActions.expected;
    yield expect(convertedSource).toEqual(expected);
}));
//# sourceMappingURL=blueprint-to-string.test.js.map