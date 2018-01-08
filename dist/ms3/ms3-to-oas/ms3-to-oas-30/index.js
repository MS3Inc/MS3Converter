"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_library_to_ms3_1 = require("../../merge-library-to-ms3");
const merge_resource_types_and_traits_1 = require("../merge-resource-types-and-traits");
const security_schemes_to_oas_1 = require("./security-schemes-to-oas");
const resources_to_paths_1 = require("./resources-to-paths");
const datatypes_to_schemas_1 = require("./datatypes-to-schemas");
const examples_to_oas_1 = require("../examples-to-oas");
const lodash_1 = require("lodash");
class MS3toOAS30 {
    constructor(ms3API, options) {
        this.ms3API = ms3API;
        this.options = options;
        this.externalFiles = {
            examples: [],
            schemas: []
        };
    }
    static create(ms3API, options) {
        return new MS3toOAS30(ms3API, options);
    }
    convert() {
        this.oasAPI = {
            openapi: '3.0',
            info: this.convertSettings(),
            paths: {},
            components: {}
        };
        if (this.ms3API.libraries)
            this.ms3API = merge_library_to_ms3_1.default(this.ms3API);
        if (this.ms3API.dataTypes) {
            if (this.options.destinationPath) {
                this.externalFiles.schemas = this.externalFiles.schemas.concat(datatypes_to_schemas_1.convertExternalSchemas(this.ms3API, this.options.destinationPath));
                this.oasAPI.components.schemas = datatypes_to_schemas_1.convertExternalSchemasReferences(this.ms3API);
            }
            else
                this.oasAPI.components.schemas = datatypes_to_schemas_1.convertDataTypesToSchemas(this.ms3API);
        }
        if (this.ms3API.examples) {
            if (this.options.destinationPath) {
                this.externalFiles.examples = this.externalFiles.examples.concat(examples_to_oas_1.convertExternalExamples(this.ms3API.examples, this.options.destinationPath));
                this.oasAPI.components.examples = examples_to_oas_1.convertExternalExampleReferences(this.ms3API.examples);
            }
            else
                this.oasAPI.components.examples = examples_to_oas_1.convertInlineExamples(this.ms3API.examples);
        }
        if (this.ms3API.securitySchemes)
            this.oasAPI.components.securitySchemes = security_schemes_to_oas_1.default(this.ms3API);
        if (this.ms3API.resources) {
            let mergedApi = lodash_1.cloneDeep(this.ms3API);
            if (this.ms3API.resourcesTypes || this.ms3API.traits) {
                mergedApi = merge_resource_types_and_traits_1.default(this.ms3API);
            }
            this.oasAPI.paths = resources_to_paths_1.default(mergedApi);
        }
        return {
            API: this.oasAPI,
            externalFiles: this.externalFiles
        };
    }
    convertSettings() {
        if (!this.ms3API.settings.title) {
            throw new Error('MS3 API settings must contain title property.');
        }
        const settings = {
            title: this.ms3API.settings.title,
            description: this.ms3API.settings.description || 'API description',
            version: this.ms3API.settings.version || '3.0'
        };
        return settings;
    }
}
function convertOAS30(ms3API, options) {
    return MS3toOAS30.create(ms3API, options).convert();
}
exports.default = convertOAS30;
//# sourceMappingURL=index.js.map