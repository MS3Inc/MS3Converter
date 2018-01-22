"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MS3MethodToActionSection {
    constructor(method, options) {
        this.method = method;
    }
    convert() {
        this.actionSection = {
            keyword: this.method.name,
            description: this.method.description,
            markdownEntity: 'header',
            nestedSections: {}
        };
        return this.actionSection;
    }
    static create(method, options) {
        return new MS3MethodToActionSection(method, options);
    }
}
exports.default = MS3MethodToActionSection;
//# sourceMappingURL=convert-method.js.map