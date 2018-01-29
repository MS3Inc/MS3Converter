"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../apro_version");
const originalProject = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'apro_version': apro_version_1.default,
    'entityTypeName': 'api',
    'traits': [
        {
            'name': 'trait',
            'description': '',
            'queryParameters': [],
            'headers': [],
            'responses': [
                {
                    'code': '101',
                    'description': '',
                    'body': [],
                    'headers': [],
                    'annotations': []
                }
            ],
            'annotations': [],
            '__id': 'd4cb39e9-1ec1-4390-95d9-1335eff85f8a',
            'selectedTraits': []
        }
    ]
};
exports.originalProject = originalProject;
const resultProject = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'apro_version': apro_version_1.default,
    'entityTypeName': 'api',
    'traits': [
        {
            'name': 'trait',
            'responses': [
                {
                    'code': '101'
                }
            ],
            '__id': 'd4cb39e9-1ec1-4390-95d9-1335eff85f8a',
        }
    ]
};
exports.resultProject = resultProject;
//# sourceMappingURL=Project-with-traits.js.map