"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.oasSettings = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0',
    },
    servers: [
        {
            url: 'http://google.com'
        }
    ],
    components: {},
    paths: {}
};
exports.ms3Settings = {
    settings: {
        title: 'params',
        baseUri: 'http://google.com',
        description: 'API description',
        version: '3.0'
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    resources: [],
    examples: [],
    dataTypes: []
};
//# sourceMappingURL=oas-30-settings-to-ms3.js.map