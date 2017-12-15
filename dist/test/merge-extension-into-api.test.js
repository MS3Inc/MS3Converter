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
const ms3_extension_to_api_1 = require("./../ms3/ms3-extension-to-api");
const merge_extension_with_api_settings_1 = require("./files/Merge-extension-with-api/merge-extension-with-api-settings");
const merge_extension_with_api_examples_1 = require("./files/Merge-extension-with-api/merge-extension-with-api-examples");
const merge_extension_with_api_datatypes_1 = require("./files/Merge-extension-with-api/merge-extension-with-api-datatypes");
const merge_extension_with_api_traits_1 = require("./files/Merge-extension-with-api/merge-extension-with-api-traits");
const merge_extension_with_api_resources_1 = require("./files/Merge-extension-with-api/merge-extension-with-api-resources");
const merge_extension_with_api_securityschemes_1 = require("./files/Merge-extension-with-api/merge-extension-with-api-securityschemes");
const merge_extension_with_api_1 = require("./files/Merge-extension-with-api/merge-extension-with-api");
test('MS3 Extension and Api settings should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_settings_1.originalProjectWithSettings)).toEqual(merge_extension_with_api_settings_1.resultProjectWithSettings);
}));
test('MS3 Extension and Api examples should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_examples_1.originalProjectWithExamples)).toEqual(merge_extension_with_api_examples_1.resultProjectWithExamples);
}));
test('MS3 Extension and Api datatypes should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_datatypes_1.originalProjectWithDataTypes)).toEqual(merge_extension_with_api_datatypes_1.resultProjectWithDataTypes);
}));
test('MS3 Extension and Api traits should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_traits_1.originalProjectWithTraits)).toEqual(merge_extension_with_api_traits_1.resultProjectWithTraits);
}));
test('MS3 Extension and Api resources should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_resources_1.originalProjectWithResources)).toEqual(merge_extension_with_api_resources_1.resultProjectWithResources);
}));
test('MS3 Extension and Api security schemes should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_securityschemes_1.originalProjectWithSecuritySchemes)).toEqual(merge_extension_with_api_securityschemes_1.resultProjectWithSecuritySchemes);
}));
test('MS3 Extension and Api should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_extension_to_api_1.default(merge_extension_with_api_1.originalProject)).toEqual(merge_extension_with_api_1.resultProject);
}));
//# sourceMappingURL=merge-extension-into-api.test.js.map