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
const fsPath = require("path");
const util = require("util");
const unzip = require("unzip");
const YAML = require("yamljs");
const node_find_files2_1 = require("node-find-files2");
const rmdir = require("rmdir");
const rmdirPromise = util.promisify(rmdir);
const readFilePromise = util.promisify(fs.readFile);
class OasLoader {
    constructor(path = '') {
        this.path = path;
        if (!path)
            throw new Error('Empty path');
    }
    parseZip() {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(this.path);
            const unzipExtractor = unzip.Extract({ path: './.temp' });
            readStream.pipe(unzipExtractor);
            unzipExtractor.on('close', () => {
                this.findApiFile()
                    .then((api) => {
                    rmdirPromise('./.temp');
                    resolve(api);
                })
                    .catch(function (error) {
                    rmdirPromise('./.temp');
                    reject(error);
                });
            });
        });
    }
    findFileBy(nameWithExtension, extension = null) {
        return new node_find_files2_1.default({
            rootFolder: './.temp',
            filterFunction: (path, stat) => {
                let isMatch = false;
                if (nameWithExtension) {
                    isMatch = (fsPath.basename(path) == nameWithExtension) ? true : false;
                }
                else if (extension) {
                    isMatch = (fsPath.extname(path) == extension) ? true : false;
                }
                const isMacFile = path.split('/').filter((str) => {
                    return str == '__MACOSX';
                }, this);
                return (isMatch && !isMacFile.length) ? path : '';
            }
        });
    }
    loadYamlPromise(path) {
        return new Promise((resolve, reject) => {
            YAML.load(path, (data) => {
                if (!data)
                    return reject(`Cannot parse yaml at: ${path}`);
                return resolve(data);
            });
        });
    }
    isSwaggerApiFile(content) {
        const reg = /(swagger\":|openapi\":|swagger:|openapi:)/g;
        return content.search(reg) !== -1 ? true : false;
    }
    findApiFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const yamlFile = yield this.findFileBy('api.yaml').startSearch();
            let jsonFile;
            if (yamlFile && yamlFile.length) {
                const path = yamlFile[0].path;
                const result = {};
                result.api = yield this.loadYamlPromise(path);
                result.definitions = yield this.getSwaggerDefinitions(result.api);
                return result;
            }
            else {
                jsonFile = yield this.findFileBy('api.json').startSearch();
                if (jsonFile && jsonFile.length) {
                    const path = jsonFile[0].path;
                    const result = {};
                    result.api = yield readFilePromise(path, 'utf-8');
                    result.definitions = yield this.getSwaggerDefinitions(result.api);
                    return result;
                }
            }
            return yield this.guessApiFile();
        });
    }
    guessApiFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileInYamlFormat = yield this.findFileBy(null, '.yaml').startSearch();
            const result = {};
            if (fileInYamlFormat.length) {
                for (const file of fileInYamlFormat) {
                    const isSwaggerApi = this.isSwaggerApiFile((yield readFilePromise(file.path, 'utf-8')));
                    if (isSwaggerApi) {
                        result.api = yield this.loadYamlPromise(file.path);
                        result.definitions = yield this.getSwaggerDefinitions(result.api);
                    }
                }
                if (result.api)
                    return result;
            }
            const fileInJsonFormat = yield this.findFileBy(null, '.json').startSearch();
            if (fileInJsonFormat.length) {
                for (const file of fileInJsonFormat) {
                    const content = yield readFilePromise(file.path, 'utf-8');
                    const isSwaggerApi = this.isSwaggerApiFile(content);
                    if (isSwaggerApi) {
                        result.api = content;
                        result.definitions = yield this.getSwaggerDefinitions(result.api);
                    }
                }
                if (result.api)
                    return result;
            }
            throw new Error('Failed to find main api definition file.');
        });
    }
    getSwaggerDefinitions(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringApi = JSON.stringify(api);
            const reg = /\$ref\"\:\"[^#](.[^"}]+)\#/g;
            const externalPaths = stringApi.match(reg);
            if (externalPaths) {
                return Promise.all(externalPaths.map(this.loadSwaggerDefinition));
            }
            return Promise.resolve([]);
        });
    }
    loadSwaggerDefinition(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedPath = path.slice(8, path.length - 1);
            const name = fsPath.basename(parsedPath, fsPath.extname(parsedPath));
            try {
                const content = yield readFilePromise(`./.temp${parsedPath}`, 'utf-8');
                return { name, content };
            }
            catch (error) {
                throw new Error(`Error reading file: ${error.message}`);
            }
        });
    }
    parseJson() {
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent;
            try {
                fileContent = yield readFilePromise(this.path, 'utf-8');
                fileContent = JSON.parse(fileContent);
            }
            catch (error) {
                throw new Error(`Error reading OAS file: ${error.message}`);
            }
            return fileContent;
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            const file = this.path.split('/')[this.path.split('/').length - 1];
            const fileExtension = file.split('.')[file.split('.').length - 1];
            switch (fileExtension) {
                case 'yaml':
                    result.api = yield this.loadYamlPromise(this.path);
                    break;
                case 'json':
                    result.api = yield this.parseJson();
                    break;
                case 'zip':
                    result = yield this.parseZip();
                    break;
                default:
                    throw new Error(`Wrong format: ${fileExtension}`);
            }
            return result;
        });
    }
    static create(path) {
        return new OasLoader(path);
    }
}
exports.default = OasLoader;
//# sourceMappingURL=loader.js.map