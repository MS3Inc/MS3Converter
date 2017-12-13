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
const Project_with_library_1 = require("./files/Project-with-library");
const merge_library_to_ms3_1 = require("../ms3/merge-library-to-ms3");
test('Should merge libraries to project Successfully', () => __awaiter(this, void 0, void 0, function* () {
    yield expect(merge_library_to_ms3_1.default(Project_with_library_1.originalProject)).toEqual(Project_with_library_1.resultObject);
}));
//# sourceMappingURL=ms3-merge-library.test.js.map