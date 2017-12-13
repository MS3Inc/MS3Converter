"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_section_to_string_1 = require("./action-section-to-string");
const common = require("./common");
class ApiBlueprintResourceGroupToString {
    constructor(source, options) {
        this.source = source;
        this.options = options;
        this.result = '';
        this.shortDescriptionLength = 40;
    }
    stringify() {
        this.result += this.source.nestedSections.map(this.stringifyResource.bind(this));
        return this.result;
    }
    stringifyResource(resource) {
        let result = '';
        result += common.createSectionHeading('', resource.keyword, 1);
        result += common.createSentence(resource.description, false);
        if (resource.nestedSections.parameters)
            result += this.stringifyParameters(resource.nestedSections.parameters);
        if (resource.nestedSections.actions && resource.nestedSections.actions.length)
            result += this.stringifyActions(resource.nestedSections.actions);
        return result;
    }
    stringifyParameters(parametersSection, nestLevel = 0) {
        let result = common.createListItem('Parameters', nestLevel);
        if (parametersSection.parameterList)
            result += parametersSection.parameterList.map(this.stringifyParameter.bind(this, nestLevel)).join();
        return result;
    }
    stringifyParameter(nestLevel = 0, parameter) {
        if (!parameter.type)
            throw new Error(`Blueprint resource parameter ${parameter.title} stringify failed due to missing type`);
        let result = '';
        const exampleValue = parameter.exampleValue ? `: \`${parameter.exampleValue}\`` : '';
        const required = parameter.required ? ', required' : '';
        const type = parameter.enum ? `enum[${parameter.type}]` : parameter.type;
        const shortDescription = parameter.description.length <= this.shortDescriptionLength ? ` - ${parameter.description}` : '';
        result += common.createListItem(`${parameter.title}${exampleValue} (${type}${required})${shortDescription}`, nestLevel + 2);
        if (!shortDescription)
            result += `\n  ${parameter.description}`;
        if (parameter.members) {
            result += common.createListItem('Members', nestLevel + 4);
            result += parameter.members.map((member) => common.createListItem(common.stringTicks(member), nestLevel + 6, false)).join('');
        }
        return result;
    }
    stringifyActions(actions, nestLevel = 0) {
        return actions.map((action) => action_section_to_string_1.default.create(action, {}).stringify()).join('/n');
    }
    static create(source, options) {
        return new ApiBlueprintResourceGroupToString(source, options);
    }
}
exports.default = ApiBlueprintResourceGroupToString;
//# sourceMappingURL=resource-section-to-string.js.map