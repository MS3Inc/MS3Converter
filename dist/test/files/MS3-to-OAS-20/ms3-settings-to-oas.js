"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3Settings = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api'
};
exports.oasSettings = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    schemes: [
        'https'
    ],
    host: 'params',
    basePath: '/',
    paths: {}
};
//# sourceMappingURL=ms3-settings-to-oas.js.map