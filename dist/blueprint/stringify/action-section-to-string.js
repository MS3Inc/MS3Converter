"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common = require("./common");
class ActionSectionToString {
    constructor(actionSection, options) {
        this.actionSection = actionSection;
        this.result = '';
    }
    stringify() {
        this.result += common.createSectionHeading('', `[${this.actionSection.keyword}]`, 2);
        this.result += common.createSentence(this.actionSection.description, false);
        return this.result;
    }
    static create(actionSection, options) {
        return new ActionSectionToString(actionSection, options);
    }
}
exports.default = ActionSectionToString;
//# sourceMappingURL=action-section-to-string.js.map