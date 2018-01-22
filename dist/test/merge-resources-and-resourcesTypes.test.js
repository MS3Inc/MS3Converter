"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_resource_types_and_traits_1 = require("./../ms3/ms3-to-oas/merge-resource-types-and-traits");
const merge_resourceTypes_1 = require("./files/Merge-resources-and-resourcesTypes/merge-resourceTypes");
test('MS3 resources and resourcesTypes should be merged successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(merge_resource_types_and_traits_1.default(merge_resourceTypes_1.originalProjectWithResourcesTypes)).toEqual(merge_resourceTypes_1.resultProjectWithResourcesTypes);
}));
//# sourceMappingURL=merge-resources-and-resourcesTypes.test.js.map