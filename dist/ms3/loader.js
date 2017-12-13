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
const fs = require("fs");
const util = require("util");
const readFilePromise = util.promisify(fs.readFile);
class Ms3Loader {
    constructor(path = '') {
        this.path = path;
        if (!path)
            throw new Error('Empty path');
    }
    readFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent;
            try {
                fileContent = yield readFilePromise(this.path, 'utf-8');
            }
            catch (error) {
                throw new Error(`Error reading Ms3 file: ${error.message}`);
            }
            return fileContent;
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileContents = yield this.readFile();
            let result;
            try {
                result = JSON.parse(fileContents);
            }
            catch (error) {
                throw new Error(`Error wrong JSON format: ${error.message}`);
            }
            return result;
        });
    }
    static create(path) {
        return new Ms3Loader(path);
    }
}
exports.default = Ms3Loader;
//# sourceMappingURL=loader.js.map