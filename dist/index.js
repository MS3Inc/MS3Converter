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
const Blueprint = require("./blueprint");
exports.Blueprint = Blueprint;
const Ms3 = require("./ms3/index");
exports.Ms3 = Ms3;
const OAS = require("./oas/index");
exports.OAS = OAS;
function validateConvertFormats(from, to) {
    if (from === to)
        throw new Error(`Cannot convert from ${from} to ${to}`);
}
function getLoaderByFormat(format, path) {
    if (format == 'ms3_1')
        return Ms3.loader.create(path);
    if (format == 'oas')
        return OAS.loader.create(path);
    throw new Error(`Loader of format ${format} does not exist.`);
}
function getConverterByFormat(format, source, options) {
    if (format == 'oas')
        return Ms3.convertToOAS.create(source, options);
    if (format == 'blueprint')
        return Ms3.convertToBlueprint.create(source, options);
    throw new Error(`Convertor to format ${format} does not exist.`);
}
function convertData(source, from, to, options) {
    return __awaiter(this, void 0, void 0, function* () {
        validateConvertFormats(from, to);
        if (!source)
            throw new Error('Source cannot be empty');
        const convertor = getConverterByFormat(to, source, options);
        return convertor.convert();
    });
}
exports.convertData = convertData;
function convertDataFromFile(sourcePath, from, to, options) {
    return __awaiter(this, void 0, void 0, function* () {
        validateConvertFormats(from, to);
        if (!sourcePath.length)
            throw new Error('Source path cannot be empty');
        const data = yield getLoaderByFormat(from, sourcePath).load();
        return convertData(data, from, to, options);
    });
}
exports.convertDataFromFile = convertDataFromFile;
//# sourceMappingURL=index.js.map