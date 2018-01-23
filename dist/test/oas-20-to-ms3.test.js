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
const oas_20_to_ms3_1 = require("../oas/oas-to-ms3/oas-20-to-ms3");
const oas_20_settings_to_ms3_1 = require("./files/OAS-20-to-MS3/oas-20-settings-to-ms3");
const oas_20_definitions_to_ms3_1 = require("./files/OAS-20-to-MS3/oas-20-definitions-to-ms3");
const oas_query_header_to_ms3_1 = require("./files/OAS-20-to-MS3/oas-query-header-to-ms3");
const oas_20_body_to_ms3_1 = require("./files/OAS-20-to-MS3/oas-20-body-to-ms3");
const oas_20_security_schemas_to_ms3_1 = require("./files/OAS-20-to-MS3/oas-20-security-schemas-to-ms3");
test('Swagger settings should be converted to MS3 successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_20_to_ms3_1.default(oas_20_settings_to_ms3_1.oasSettings)).toEqual(oas_20_settings_to_ms3_1.ms3Settings);
}));
test('Swagger definitions should be converted to MS3 dataTypes successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_20_to_ms3_1.default(oas_20_definitions_to_ms3_1.oasDefinitions)).toEqual(oas_20_definitions_to_ms3_1.ms3DataTypes);
}));
test('Swagger headers and query should be converted to MS3 successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_20_to_ms3_1.default(oas_query_header_to_ms3_1.oasHeaderQuery)).toEqual(oas_query_header_to_ms3_1.ms3HeaderQuery);
}));
test('Swagger securityDefinitions should be converted to MS3 successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_20_to_ms3_1.default(oas_20_security_schemas_to_ms3_1.oasSecuritySchemes)).toEqual(oas_20_security_schemas_to_ms3_1.ms3SecuritySchemes);
}));
test('Swagger path body should be converted to MS3 successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(oas_20_to_ms3_1.default(oas_20_body_to_ms3_1.oasBody)).toEqual(oas_20_body_to_ms3_1.ms3Body);
}));
// test('Swagger response should be converted to MS3 successfully', async() => {
//   expect(convertOAS20toMS3(oasResourceWithResponses)).toEqual(ms3ResourceWithResponses);
// }); 
//# sourceMappingURL=oas-20-to-ms3.test.js.map