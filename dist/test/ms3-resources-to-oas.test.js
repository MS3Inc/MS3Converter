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
const resource_with_parameters_1 = require("./files/MS3-resources-to-OAS/resource-with-parameters");
const nested_resources_1 = require("./files/MS3-resources-to-OAS/nested-resources");
const resource_with_request_body_1 = require("./files/MS3-resources-to-OAS/resource-with-request-body");
const resource_with_responses_1 = require("./files/MS3-resources-to-OAS/resource-with-responses");
const resource_with_securedBy_1 = require("./files/MS3-resources-to-OAS/resource-with-securedBy");
test('One MS3 resource with headers and query parameters should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(resource_with_parameters_1.originalResourceWithParameters).convert();
    expect(JSON.parse(result)).toEqual(resource_with_parameters_1.resultResourceWithParameters);
}));
test('Nested MS3 resources should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(nested_resources_1.originalNestedResources).convert();
    expect(JSON.parse(result)).toEqual(nested_resources_1.resultNestedResources);
}));
test('MS3 resources with bodies should be converted to OAS successfully', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(resource_with_request_body_1.originalResourceWithRequestBody).convert();
    expect(JSON.parse(result)).toEqual(resource_with_request_body_1.resultResourceWithRequestBody);
}));
test('MS3 resources with responses should be converted to OAS successfully 1', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(resource_with_responses_1.originalResourceWithResponses).convert();
    expect(JSON.parse(result)).toEqual(resource_with_responses_1.resultResourceWithResponses);
}));
test('MS3 resources with responses should be converted to OAS successfully 2', () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.default.create(resource_with_securedBy_1.originalResourceWithSecuredBy).convert();
    expect(JSON.parse(result)).toEqual(resource_with_securedBy_1.resultResourceWithSecuredBy);
}));
//# sourceMappingURL=ms3-resources-to-oas.test.js.map