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
                    parameters: {
                        keyword: 'Parameters',
                        identifier: 'parameters',
                        markdownEntity: 'list',
                        parameterList: [
                            {
                                title: 'id',
                                type: 'string',
                                description: 'Id of a Client',
                                enum: true,
                                members: ['A', 'B', 'C']
                            }
                        ]
                    },
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

+ Parameters

  + id (enum[string]) - Id of a Client

    + Members
      + \`A\`
      + \`B\`
      + \`C\`

## [POST]
action description
`;
exports.expected = expected;
//# sourceMappingURL=blueprint-resource-parameters.js.map