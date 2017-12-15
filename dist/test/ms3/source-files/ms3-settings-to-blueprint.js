"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sourceMs3Api = {
    entityTypeName: 'api',
    ms3_version: '1.2.2',
    settings: {
        title: 'Test API',
        baseUri: 'http://test-api.com',
        description: 'description goes here'
    }
};
exports.sourceMs3Api = sourceMs3Api;
const expectedStringifiedApiBlueprint = `FORMAT: 1A
HOST: http://test-api.com

#Test API
description goes here
`;
exports.expectedStringifiedApiBlueprint = expectedStringifiedApiBlueprint;
//# sourceMappingURL=ms3-settings-to-blueprint.js.map