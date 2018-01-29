"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalProjectWithDataTypes = {
    'apro_version': apro_version_1.default,
    'settings': {
        'extends': {
            'entityTypeName': 'api',
            'apro_version': apro_version_1.default,
            'settings': {
                'baseUri': 'http://mergeAPI',
                'title': 'Merge API',
                'description': 'description from API'
            },
            'dataTypes': [
                {
                    'type': 'string',
                    'description': 'desc',
                    'name': 'schema in API',
                    'default': 'default',
                    '__id': 'api-dt-id-1'
                },
                {
                    'type': 'string',
                    'description': 'desc',
                    'name': 'schema',
                    'default': 'should be overwriten',
                    '__id': 'api-dt-id-2'
                },
                {
                    'type': 'string',
                    'description': 'desc',
                    'name': 'schema2',
                    'default': 'should be overwriten',
                    '__id': 'api-dt-id-3'
                }
            ],
        },
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
    },
    'dataTypes': [
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema in EXT',
            'default': 'default',
            '__id': 'ext-dt-id-1'
        },
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema',
            'default': 'should overwrite',
            '__id': 'ext-dt-id-2'
        },
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema2',
            'default': 'should overwrite',
            '__id': 'ext-dt-id-3'
        }
    ],
    'entityTypeName': 'api',
};
exports.resultProjectWithDataTypes = {
    'apro_version': apro_version_1.default,
    'settings': {
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
        'description': 'description from API'
    },
    'dataTypes': [
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema in EXT',
            'default': 'default',
            '__id': 'ext-dt-id-1'
        },
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema',
            'default': 'should overwrite',
            '__id': 'ext-dt-id-2'
        },
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema2',
            'default': 'should overwrite',
            '__id': 'ext-dt-id-3'
        },
        {
            'type': 'string',
            'description': 'desc',
            'name': 'schema in API',
            'default': 'default',
            '__id': 'api-dt-id-1'
        }
    ],
    'entityTypeName': 'api'
};
//# sourceMappingURL=merge-extension-with-api-datatypes.js.map