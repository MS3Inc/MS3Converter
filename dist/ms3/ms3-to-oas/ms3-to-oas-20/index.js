"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_library_to_ms3_1 = require("../../merge-library-to-ms3");
const merge_resource_types_and_traits_1 = require("../merge-resource-types-and-traits");
const security_schemes_to_oas_1 = require("./security-schemes-to-oas");
const resources_to_paths_1 = require("./resources-to-paths");
const datatypes_to_schemas_1 = require("./datatypes-to-schemas");
const examples_to_oas_1 = require("../examples-to-oas");
const lodash_1 = require("lodash");
const urlParser = require("url-parse");
class MS3toOAS20 {
    constructor(ms3API, options) {
        this.ms3API = ms3API;
        this.options = options;
        this.externalFiles = {
            examples: [],
            schemas: []
        };
        this.mediaTypes = [];
    }
    static create(ms3API, options) {
        return new MS3toOAS20(ms3API, options);
    }
    convert() {
        const parsedBaseUri = urlParser(this.ms3API.settings.baseUri || '/');
        this.oasAPI = {
            swagger: '2.0',
            info: this.convertSettings(),
            paths: {},
            basePath: decodeURI(parsedBaseUri.pathname) || '/',
            host: decodeURI(parsedBaseUri.host)
        };
        if (this.ms3API.libraries)
            this.ms3API = merge_library_to_ms3_1.default(this.ms3API);
        if (this.ms3API.settings.protocols && this.ms3API.settings.protocols.length) {
            this.oasAPI.schemes = lodash_1.map(this.ms3API.settings.protocols, (protocol) => {
                return protocol.toLowerCase();
            });
        }
        else {
            this.oasAPI.schemes = ['https'];
        }
        if (this.ms3API.dataTypes) {
            if (this.options.destinationPath && !this.options.asSingleFile) {
                this.externalFiles.schemas = this.externalFiles.schemas.concat(datatypes_to_schemas_1.convertExternalSchemas(this.ms3API, this.options.destinationPath));
                this.oasAPI.definitions = datatypes_to_schemas_1.convertExternalSchemasReferences(this.ms3API);
            }
            else
                this.oasAPI.definitions = datatypes_to_schemas_1.convertDataTypesToSchemas(this.ms3API);
        }
        if (this.ms3API.examples && this.options.destinationPath) {
            this.externalFiles.examples = this.externalFiles.examples.concat(examples_to_oas_1.convertExternalExamples(this.ms3API.examples, this.options.destinationPath));
        }
        if (this.ms3API.securitySchemes)
            this.oasAPI.securityDefinitions = security_schemes_to_oas_1.default(this.ms3API);
        if (this.ms3API.resources) {
            let mergedApi = lodash_1.cloneDeep(this.ms3API);
            if (this.ms3API.resourcesTypes || this.ms3API.traits) {
                mergedApi = merge_resource_types_and_traits_1.default(this.ms3API);
            }
            this.oasAPI.paths = resources_to_paths_1.default(mergedApi, this.options.asSingleFile);
        }
        return {
            API: this.oasAPI,
            externalFiles: this.externalFiles
        };
    }
    convertSettings() {
        const settings = this.ms3API.settings;
        if (!settings.title) {
            throw new Error('MS3 API settings must contain title property.');
        }
        const info = {
            title: settings.title,
            version: settings.version || '2.0'
        };
        if (settings.description)
            info.description = settings.description;
        return info;
    }
}
function convertOAS20(ms3API, options) {
    return MS3toOAS20.create(ms3API, options).convert();
}
exports.default = convertOAS20;
//# sourceMappingURL=index.js.map