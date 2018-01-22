"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_method_1 = require("./convert-method");
const convert_parameters_1 = require("./convert-parameters");
class Ms3ResourceToBlueprint {
    constructor(Ms3Resource) {
        this.Ms3Resource = Ms3Resource;
    }
    convert() {
        this.resourceSection.description = this.Ms3Resource.description;
        this.resourceSection.identifier = this.Ms3Resource.path;
        if (this.Ms3Resource.pathVariables && this.Ms3Resource.pathVariables.length)
            this.resourceSection.nestedSections.parameters = convert_parameters_1.default.create(this.Ms3Resource.pathVariables, {}).convert();
        if (this.Ms3Resource.methods) {
            const actions = this.convertMethods(this.Ms3Resource.methods);
            if (actions)
                this.resourceSection.nestedSections.actions = actions;
        }
        // this.resourceSection.nestedSections = this.convertMethods(this.Ms3Resource.methods);
        return this.resourceSection;
    }
    convertMethods(methods) {
        const activeMethods = methods.filter((method) => method.active);
        if (activeMethods.length)
            return methods.map((method) => convert_method_1.default.create(method, {}).convert());
        return null;
    }
    static create(Ms3Resource) {
        return new Ms3ResourceToBlueprint(Ms3Resource);
    }
}
exports.default = Ms3ResourceToBlueprint;
//# sourceMappingURL=convert-resource.js.map