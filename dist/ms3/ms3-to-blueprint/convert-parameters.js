"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MS3UriParametersToParametersSection {
    constructor(originalParameters, options) {
        this.originalParameters = originalParameters;
    }
    convert() {
        return {
            parameterList: this.originalParameters.map((param) => this.convertUriParameter(param)),
            keyword: 'Parameters',
            markdownEntity: 'list'
        };
    }
    convertUriParameter(parameter) {
        return {
            title: parameter.displayName,
            type: parameter.type,
            required: parameter.required,
            exampleValue: parameter.example,
            defaultValue: parameter.default,
            enum: parameter.enum.length > 0,
            members: parameter.enum
        };
    }
    static create(originalParameters, options) {
        return new MS3UriParametersToParametersSection(originalParameters, options);
    }
}
exports.default = MS3UriParametersToParametersSection;
//# sourceMappingURL=convert-parameters.js.map