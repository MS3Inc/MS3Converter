"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source = {
    metadata: {
        markdownEntity: 'special',
        format: '1A',
        host: 'http://Somehost'
    },
    name: 'some_name',
    overview: 'Some overview',
    description: 'API Description goes here',
    resourceGroup: {
        keyword: 'Resources',
        identifier: 'resource group',
        markdownEntity: 'header',
        nestedSections: [
            {
                keyword: '/clients/{id}',
                identifier: 'resource',
                markdownEntity: 'header',
                description: 'Clients endpoint',
                nestedSections: {
                    actions: [
                        {
                            keyword: 'POST',
                            description: 'action description',
                            markdownEntity: 'header',
                            nestedSections: {}
                        }
                    ]
                }
            }
        ]
    }
};
exports.source = source;
const expected = `FORMAT: 1A
HOST: http://Somehost

#some_name
API Description goes here

# /clients/{id}
Clients endpoint

## [POST]
action description
`;
exports.expected = expected;
//# sourceMappingURL=blueprint-resource-actions.js.map