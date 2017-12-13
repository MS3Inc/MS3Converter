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
const path = require("path");
const fs_1 = require("fs");
const util_1 = require("util");
const YAML = require("yamljs");
const writeFilePromise = util_1.promisify(fs_1.writeFile);
class MS3toOAS {
    constructor(ms3API, options) {
        this.ms3API = ms3API;
        this.options = options;
    }
    convertAPI() {
        this.oasAPI = {
            openapi: '2.0',
            info: this.convertSettings(),
            paths: {}
        };
        return this.oasAPI;
    }
    convertOverlay() {
        // check for extended project and merge overlay
        return this.oasAPI;
    }
    convertExtension() {
        // check for extended project and merge extension
        return this.oasAPI;
    }
    convert() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = { path: '' };
            switch (this.ms3API.entityTypeName) {
                case 'api':
                    result.content = this.convertAPI();
                    break;
                case 'overlay':
                    result.content = this.convertOverlay();
                    break;
                case 'extension':
                    result.content = this.convertExtension();
                    break;
                case 'library':
                    throw new Error('Library can not be converted to swagger.');
            }
            if (this.options.destinationPath) {
                result.path = path.join(this.options.destinationPath, `api.${this.options.fileFormat == 'json' ? 'json' : 'yaml'}`);
                yield this.writeToDisc(result);
            }
            return result.content;
        });
    }
    convertSettings() {
        if (!this.ms3API.settings.title) {
            throw new Error('MS3 API settings must contain title property.');
        }
        const settings = {
            title: this.ms3API.settings.title,
            description: this.ms3API.settings.description || 'API description',
            version: this.ms3API.settings.version || '2.0'
        };
        return settings;
    }
    static getDefaultConfig() {
        return {
            fileFormat: 'json',
            asSingleFile: true
        };
    }
    writeToDisc(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (this.options.fileFormat == 'yaml') {
                result = YAML.stringify(data.content, 2);
            }
            else {
                result = JSON.stringify(data.content, undefined, 2);
            }
            yield writeFilePromise(data.path, result);
        });
    }
    static create(api, options = this.getDefaultConfig()) {
        return new MS3toOAS(api, options);
    }
}
exports.default = MS3toOAS;
//# sourceMappingURL=ms3-to-oas.js.map