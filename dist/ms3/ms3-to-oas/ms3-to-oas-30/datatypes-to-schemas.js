"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datatypes_to_schemas_1 = require("../ms3-to-oas-20/datatypes-to-schemas");
class ConvertDataTypesToSchemas extends datatypes_to_schemas_1.ConvertDataTypesToSchemasOAS2 {
    constructor() {
        super(...arguments);
        this.baseDefinitionsPath = '#/components';
    }
    static create(api) {
        return new ConvertDataTypesToSchemas(api);
    }
}
function convertDataTypesToSchemas(API) {
    return ConvertDataTypesToSchemas.create(API).convert();
}
exports.convertDataTypesToSchemas = convertDataTypesToSchemas;
function convertExternalSchemas(API, schemasPath) {
    return ConvertDataTypesToSchemas.create(API).convertExternal(schemasPath);
}
exports.convertExternalSchemas = convertExternalSchemas;
function convertExternalSchemasReferences(API) {
    return ConvertDataTypesToSchemas.create(API).convertWithReferences();
}
exports.convertExternalSchemasReferences = convertExternalSchemasReferences;
//# sourceMappingURL=datatypes-to-schemas.js.map