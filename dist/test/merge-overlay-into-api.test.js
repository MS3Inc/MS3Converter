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
const ms3_overlay_to_api_1 = require("./../ms3/ms3-overlay-to-api");
const merge_overlay_with_api_1 = require("./files/Merge-overlay-with-api/merge-overlay-with-api");
test('MS3 Extension and Api should be merged together successfully', () => __awaiter(this, void 0, void 0, function* () {
    expect(ms3_overlay_to_api_1.default(merge_overlay_with_api_1.originalProject)).toEqual(merge_overlay_with_api_1.resultProject);
}));
//# sourceMappingURL=merge-overlay-into-api.test.js.map