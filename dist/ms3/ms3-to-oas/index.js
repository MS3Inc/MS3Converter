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
const YAML = require("yamljs");
const fs_1 = require("fs");
const util_1 = require("util");
const mkdirp2_1 = require("mkdirp2");
const ms3_overlay_to_api_1 = require("../ms3-overlay-to-api");
const ms3_extension_to_api_1 = require("../ms3-extension-to-api");
const ms3_to_oas_20_1 = require("./ms3-to-oas-20");
const ms3_to_oas_30_1 = require("./ms3-to-oas-30");
const writeFilePromise = util_1.promisify(fs_1.writeFile);
class MS3toOAS {
    constructor(ms3API, options) {
        this.ms3API = ms3API;
        this.options = options;
        this.externalFiles = {
            examples: [],
            schemas: []
        };
        this.result = {
            path: ''
        };
    }
    static getDefaultConfig() {
        return {
            fileFormat: 'json',
            asSingleFile: true,
            oasVersion: '3.0'
        };
    }
    convert() {
        return __awaiter(this, void 0, void 0, function* () {
            const version = this.options.oasVersion || '3.0';
            switch (this.ms3API.entityTypeName) {
                case 'overlay':
                    this.ms3API = ms3_overlay_to_api_1.default(this.ms3API);
                case 'extension': {
                    this.ms3API = ms3_extension_to_api_1.default(this.ms3API);
                }
                case 'library':
                    throw new Error('Library can not be converted to swagger.');
            }
            let result = null;
            if (version == '2.0')
                result = ms3_to_oas_20_1.default(this.ms3API, this.options);
            if (version == '3.0')
                result = ms3_to_oas_30_1.default(this.ms3API, this.options);
            this.result.content = result.API;
            this.externalFiles = result.externalFiles;
            yield this.finalize();
            return this.result.content;
        });
    }
    finalize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.destinationPath)
                yield this.write();
            this.result.content = this.stringifyContent(this.result.content, this.options.fileFormat);
        });
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            this.result.path = path.join(this.options.destinationPath, `api.${this.options.fileFormat == 'json' ? 'json' : 'yaml'}`);
            yield this.writeApiToDisc(this.result);
            if (this.externalFiles.examples.length) {
                yield mkdirp2_1.promise(path.join(this.options.destinationPath, 'examples'));
                yield this.writeExamplesToDisk();
            }
            if (this.externalFiles.schemas.length) {
                yield mkdirp2_1.promise(path.join(this.options.destinationPath, 'schemas'));
                yield this.writeSchemasToDisk();
            }
        });
    }
    stringifyContent(content, format) {
        if (this.options.fileFormat == 'yaml') {
            return YAML.stringify(content, 8, 2);
        }
        return JSON.stringify(content, undefined, 2);
    }
    writeApiToDisc(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultContent = this.stringifyContent(data.content, this.options.fileFormat);
            yield writeFilePromise(data.path, resultContent);
        });
    }
    writeExamplesToDisk() {
        const promisesArray = this.externalFiles.examples.map((file) => writeFilePromise(file.path, JSON.stringify(file.content, undefined, 2)));
        return Promise.all(promisesArray);
    }
    writeSchemasToDisk() {
        const promisesArray = this.externalFiles.schemas.map((file) => writeFilePromise(file.path, JSON.stringify(file.content, undefined, 2)));
        return Promise.all(promisesArray);
    }
    static create(api, options = this.getDefaultConfig()) {
        return new MS3toOAS(api, options);
    }
}
exports.default = MS3toOAS;
//# sourceMappingURL=index.js.map