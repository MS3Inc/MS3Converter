import * as ApiBlueprint from '../../../../blueprint/interfaces/blueprint-interface';

const source: ApiBlueprint.API = {
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
              nestedSections: {
                responses: {
                  keyword: 'Response',
                  markdownEntity: 'list',
                  responseList: [{
                    identifier: '100',
                    mediaType: 'application/json',
                    value: '{value: 1}'
                  }]
                }
              }
            }
          ]
        }
      }
    ]
  }
};

const expected: string = `FORMAT: 1A
HOST: http://Somehost

#some_name
API Description goes here

# /clients/{id}
Clients endpoint

## [POST]
action description

+ Response 100 (application/json)

   {value: 1}
`;

export { source, expected };