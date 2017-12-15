"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class MergeLibraryToMs3 {
    constructor(API) {
        this.API = API;
    }
    checkDuplicates(targetArr, item, counter = 1) {
        const propName = item.name ? 'name' : 'title';
        const itemName = lodash_1.map(targetArr, (target) => target[propName]);
        if (itemName.indexOf(item[propName]) != -1) {
            item[propName] = `${item[propName]}-${counter}`;
            counter++;
            return this.checkDuplicates(targetArr, item, counter);
        }
        targetArr.push(item);
    }
    mergeProjectParts(project) {
        this.libraries.reduce((project, lib) => {
            lib.traits.forEach((trait) => this.checkDuplicates(project.traits, trait));
            lib.resourcesTypes.forEach((resourceType) => this.checkDuplicates(project.resourcesTypes, resourceType));
            lib.securitySchemes.forEach((secSchema) => this.checkDuplicates(project.securitySchemes, secSchema));
            lib.annotationTypes.forEach((annotationType) => this.checkDuplicates(project.annotationTypes, annotationType));
            lib.dataTypes.forEach((dataType) => this.checkDuplicates(project.dataTypes, dataType));
            lib.examples.forEach((example) => this.checkDuplicates(project.examples, example));
            return project;
        }, project);
    }
    merge() {
        const project = lodash_1.cloneDeep(this.API);
        this.libraries = project.libraries.map((lib) => lib.library);
        delete project.libraries;
        this.mergeProjectParts(project);
        return project;
    }
    static create(api) {
        return new MergeLibraryToMs3(api);
    }
}
function mergeLibraryToMs3(API) {
    return MergeLibraryToMs3.create(API).merge();
}
exports.default = mergeLibraryToMs3;
//# sourceMappingURL=merge-library-to-ms3.js.map