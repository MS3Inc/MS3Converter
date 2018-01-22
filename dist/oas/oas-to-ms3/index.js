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
const fs_1 = require("fs");
const util_1 = require("util");
const oas_30_to_ms3_1 = require("../oas-to-ms3/oas-30-to-ms3");
const oas_20_to_ms3_1 = require("../oas-to-ms3/oas-20-to-ms3");
const writeFilePromise = util_1.promisify(fs_1.writeFile);
class MS3toOAS {
    constructor(ms3API, options) {
        this.ms3API = ms3API;
        this.options = options;
        this.result = {
            path: ''
        };
    }
    convertOAStoMS3() {
        if (this.oasAPI.openapi) {
            return oas_30_to_ms3_1.default(this.oasAPI);
        }
        else if (this.oasAPI.swagger == '2.0') {
            return oas_20_to_ms3_1.default(this.oasAPI);
        }
        else {
            throw new Error('Wrong Swagger format');
        }
    }
    convert() {
        return __awaiter(this, void 0, void 0, function* () {
            this.result.content = this.convertOAStoMS3();
            yield this.write();
            return this.result.content;
        });
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.destinationPath) {
                this.result.path = `${this.options.destinationPath}api.ms3`;
                yield writeFilePromise(this.result.path, this.result.content);
            }
        });
    }
    static create(api, options) {
        return new MS3toOAS(api, options);
    }
}
exports.default = MS3toOAS;
//# sourceMappingURL=index.js.map