"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalProjectWithSettings = {
    'apro_version': apro_version_1.default,
    'settings': {
        'extends': {
            'entityTypeName': 'api',
            'apro_version': apro_version_1.default,
            'settings': {
                'baseUri': 'http://mergeAPI',
                'title': 'Merge API',
                'description': 'description from API',
                'securedBy': [
                    'name'
                ],
                'protocols': [
                    'HTTPS'
                ],
                'annotations': [
                    {
                        'name': 'annotation from API',
                        'type': 'string',
                        'value': 'Api'
                    },
                    {
                        'name': 'annotation',
                        'type': 'string',
                        'value': 'should be overwritten'
                    }
                ],
                'baseUriParameters': [
                    {
                        'displayName': 'base uri from API',
                        'type': 'boolean',
                        'repeat': false,
                        'required': false
                    },
                    {
                        'displayName': 'base uri',
                        'type': 'string',
                        'repeat': false,
                        'required': false
                    }
                ]
            }
        },
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
        'securedBy': [
            'name2'
        ],
        'mediaType': 'application/json',
        'annotations': [
            {
                'name': 'annotation from EXT',
                'type': 'string',
                'value': 'EXT'
            },
            {
                'name': 'annotation',
                'type': 'string',
                'value': 'hey'
            }
        ],
        'baseUriParameters': [
            {
                'displayName': 'base uri from EXT',
                'type': 'boolean',
                'repeat': false,
                'required': false
            },
            {
                'displayName': 'base uri',
                'type': 'integer',
                'repeat': false,
                'required': false
            }
        ]
    },
    'entityTypeName': 'api'
};
exports.resultProjectWithSettings = {
    'apro_version': apro_version_1.default,
    'settings': {
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
        'description': 'description from API',
        'securedBy': [
            'name2',
            'name'
        ],
        'protocols': [
            'HTTPS'
        ],
        'mediaType': 'application/json',
        'annotations': [
            {
                'name': 'annotation from EXT',
                'type': 'string',
                'value': 'EXT'
            },
            {
                'name': 'annotation',
                'type': 'string',
                'value': 'hey'
            },
            {
                'name': 'annotation from API',
                'type': 'string',
                'value': 'Api'
            }
        ],
        'baseUriParameters': [
            {
                'displayName': 'base uri from EXT',
                'type': 'boolean',
                'repeat': false,
                'required': false
            },
            {
                'displayName': 'base uri',
                'type': 'integer',
                'repeat': false,
                'required': false
            },
            {
                'displayName': 'base uri from API',
                'type': 'boolean',
                'repeat': false,
                'required': false
            }
        ]
    },
    'entityTypeName': 'api'
};
//# sourceMappingURL=merge-extension-with-api-settings.js.map