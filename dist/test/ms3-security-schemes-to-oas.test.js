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
const OAuth20_1 = require("./files/MS3-security-schemes-to-OAS.ts/OAuth20");
const BasicAuthentication_1 = require("./files/MS3-security-schemes-to-OAS.ts/BasicAuthentication");
const Basic_and_Digest_auth_1 = require("./files/MS3-security-schemes-to-OAS.ts/Basic-and-Digest-auth");
test('One MS3 resource with headers and query parameters should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(OAuth20_1.originalOAuth20).convert();
    expect(JSON.parse(result)).toEqual(OAuth20_1.resultOAuth20);
}));
test('One MS3 resource with headers and query parameters should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(BasicAuthentication_1.originalBasicAuth).convert();
    expect(JSON.parse(result)).toEqual(BasicAuthentication_1.resultBasicAuth);
}));
test('One MS3 resource with headers and query parameters should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(Basic_and_Digest_auth_1.originalBasicAndDigestAuth).convert();
    expect(JSON.parse(result)).toEqual(Basic_and_Digest_auth_1.resultBasicAndDigestAuth);
}));
//# sourceMappingURL=ms3-security-schemes-to-oas.test.js.map