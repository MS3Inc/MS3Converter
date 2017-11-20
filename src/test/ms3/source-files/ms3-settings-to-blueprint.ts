import * as MS3 from '../../../ms3/ms3-v1-api-interface';

const sourceMs3Api: MS3.API = {
  entityTypeName: 'api',
  ms3_version: '1.2.2',
  settings: {
    title: 'Test API',
    baseUri: 'http://test-api.com',
    description: 'description goes here'
  }
};

const expectedStringifiedApiBlueprint: string = `FORMAT: 1A
HOST: http://test-api.com

#Test API
description goes here
`;

export { sourceMs3Api, expectedStringifiedApiBlueprint };