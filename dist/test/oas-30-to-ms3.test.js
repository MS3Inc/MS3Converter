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
const oas_30_to_ms3_1 = require("../oas/oas-to-ms3/oas-30-to-ms3");
const oas_30_settings_to_ms3_1 = require("./files/OAS-30-to-MS3/oas-30-settings-to-ms3");
const oas_30_resources_parameters_to_ms3_1 = require("./files/OAS-30-to-MS3/oas-30-resources-parameters-to-ms3");
const oas_30_resources_request_body_to_ms3_1 = require("./files/OAS-30-to-MS3/oas-30-resources-request-body-to-ms3");
const oas_30_resource_responses_to_ms3_1 = require("./files/OAS-30-to-MS3/oas-30-resource-responses-to-ms3");
const schemas_to_dataTypes_1 = require("../oas/schemas-to-dataTypes");
const oas_schemas_to_dataTypes_1 = require("./files/OAS-30-to-MS3/oas-schemas-to-dataTypes");
const oas_30_security_schemas_to_ms3_1 = require("./files/OAS-30-to-MS3/oas-30-security-schemas-to-ms3");
const oas_30_security_to_ms3_format_1 = require("./files/OAS-30-to-MS3/oas-30-security-to-ms3-format");
test('OAS settings should be converted to MS3 successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_30_to_ms3_1.default(oas_30_settings_to_ms3_1.oasSettings)).toEqual(oas_30_settings_to_ms3_1.ms3Settings);
}));
test('OAS paths with parameters should be converted to MS3 resources successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_30_to_ms3_1.default(oas_30_resources_parameters_to_ms3_1.oasPathsWithParameters)).toEqual(oas_30_resources_parameters_to_ms3_1.ms3ResourcesWithParameters);
}));
test('OAS paths with request body should be converted to MS3 resources successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_30_to_ms3_1.default(oas_30_resources_request_body_to_ms3_1.oasPathsWithRequestBody)).toEqual(oas_30_resources_request_body_to_ms3_1.ms3ResourcesWithRequestBody);
}));
test('OAS paths with responses should be converted to MS3 resources successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_30_to_ms3_1.default(oas_30_resource_responses_to_ms3_1.oasPathsWithResponses)).toEqual(oas_30_resource_responses_to_ms3_1.ms3ResourcesWithResponses);
}));
test('OAS primitive schema should be converted successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(schemas_to_dataTypes_1.default(oas_schemas_to_dataTypes_1.oasPrimitive)).toEqual(oas_schemas_to_dataTypes_1.ms3Primitive);
}));
test('OAS array schema should be converted successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(schemas_to_dataTypes_1.default(oas_schemas_to_dataTypes_1.oasArray)).toEqual(oas_schemas_to_dataTypes_1.ms3Array);
}));
test('OAS object schema should be converted successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(schemas_to_dataTypes_1.default(oas_schemas_to_dataTypes_1.oasObject)).toEqual(oas_schemas_to_dataTypes_1.ms3Object);
}));
test('OAS security Schemas should should be converted successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_30_to_ms3_1.default(oas_30_security_schemas_to_ms3_1.oas_security_schemas)).toEqual(oas_30_security_schemas_to_ms3_1.ms3SecuritySchemasResult);
}));
test('OAS security property should be converted successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_30_to_ms3_1.default(oas_30_security_to_ms3_format_1.oas_security)).toEqual(oas_30_security_to_ms3_format_1.ms3SecuredBy);
}));
//# sourceMappingURL=oas-30-to-ms3.test.js.map