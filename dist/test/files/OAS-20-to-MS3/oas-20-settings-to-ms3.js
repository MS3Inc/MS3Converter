"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.oasSettings = {
    swagger: '2.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '2.0',
    },
    host: 'base.uri',
    basePath: '/v2',
    schemes: ['http'],
    paths: {}
};
exports.ms3Settings = {
    settings: {
        title: 'params',
        baseUri: 'http://base.uri/v2',
        description: 'API description',
        version: '2.0',
        protocols: ['http']
    },
    securitySchemes: [],
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    dataTypes: [],
    resources: []
};
//# sourceMappingURL=oas-20-settings-to-ms3.js.map