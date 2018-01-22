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
const convert_resource_1 = require("./convert-resource");
const index_1 = require("../../blueprint/stringify/index");
const fs_1 = require("fs");
const util_1 = require("util");
const writeFilePromise = util_1.promisify(fs_1.writeFile);
class MS3ToBlueprint {
    constructor(Ms3Api, options) {
        this.Ms3Api = Ms3Api;
        this.options = options;
        this.resultApi = {};
        this.defaultOptions = {
            destinationPath: '',
            asSingleFile: true,
            fileFormat: 'apib'
        };
        Object.assign(this.options, this.defaultOptions);
    }
    convert() {
        Object.assign(this.resultApi, this.convertSettings(this.Ms3Api.settings));
        this.resultApi.resourcesGroup = this.convertResources(this.Ms3Api.resources || []);
        if (this.options.destinationPath && this.options.destinationPath.length)
            return this.writeToDisc({
                path: this.options.destinationPath,
                content: this.resultApi
            });
        return index_1.default.create(this.resultApi, {}).stringify();
    }
    convertResources(ms3Resources) {
        return {
            keyword: 'Group',
            markdownEntity: 'header',
            identifier: 'Resource group',
            nestedSections: ms3Resources.map((ms3Resource) => convert_resource_1.default.create(ms3Resource).convert())
        };
    }
    convertSettings(settings) {
        return {
            metadata: this.getMetadataFromMs3(settings),
            name: settings.title,
            description: settings.description
        };
    }
    getMetadataFromMs3(settings) {
        return {
            format: '1A',
            host: settings.baseUri,
            markdownEntity: 'special'
        };
    }
    static create(MS3Api, options) {
        return new MS3ToBlueprint(MS3Api, options);
    }
    writeToDisc(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = index_1.default.create(this.resultApi, {}).stringify();
            yield writeFilePromise(data.path, result);
        });
    }
}
exports.default = MS3ToBlueprint;
//# sourceMappingURL=ms3-to-blueprint.js.map