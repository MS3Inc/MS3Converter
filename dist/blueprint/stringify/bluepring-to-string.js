"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blueprint_resource_section_to_string_1 = require("./blueprint-resource-section-to-string");
class ApiBlueprintToString {
    constructor(source, options) {
        this.source = source;
        this.options = options;
        this.result = '';
    }
    stringify() {
        this.result += this.stringifyMetaData(this.source.metadata);
        this.result += ApiBlueprintToString.stringifyNameSection(this.source);
        if (this.source.resourceGroup)
            this.result += blueprint_resource_section_to_string_1.default.create(this.source.resourceGroup, {}).stringify();
        return this.result;
    }
    stringifyMetaData(metadata) {
        let result = `FORMAT: ${this.source.metadata.format ? this.source.metadata.format : '1A'}\n`;
        if (this.source.metadata.host)
            result += `HOST: ${this.source.metadata.host}\n`;
        return result;
    }
    static stringifyNameSection(api) {
        let result = '';
        if (api.name)
            result += ApiBlueprintToString.createSectionHeading(api.name);
        if (api.description)
            result += `${api.description}\n`;
        return result;
    }
    static createSectionHeading(content, level = 1) {
        return `\n${'#'.repeat(level)}${content}\n`;
    }
    static create(source, options) {
        return new ApiBlueprintToString(source, options);
    }
}
exports.default = ApiBlueprintToString;
//# sourceMappingURL=bluepring-to-string.js.map