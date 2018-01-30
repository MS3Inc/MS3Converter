"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3APIBaseUri = {
    settings: {
        title: 'params',
        baseUri: 'http://{param}.params.com/{anotherparam}',
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api'
};
exports.OASApiHostAndBasePath = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    host: '{param}.params.com',
    basePath: '/{anotherparam}',
    paths: {}
};
//# sourceMappingURL=ms3-baseuri-to-oas.js.map