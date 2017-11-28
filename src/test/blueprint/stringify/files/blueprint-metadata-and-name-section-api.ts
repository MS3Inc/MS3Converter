import * as ApiBlueprint from '../../../../blueprint/interfaces/blueprint-interface';

const sourceApiWithMetadataAndNameSectionFilled: ApiBlueprint.API = {
  metadata: {
    markdownEntity: 'special',
    format: '1A',
    host: 'http://Somehost'
  },
  name: 'some_name',
  overview: 'Some overview',
  description: 'API Description goes here'
};

const expectedStringifiedApiBlueprint: string = `FORMAT: 1A
HOST: http://Somehost

#some_name
API Description goes here
`;

export { sourceApiWithMetadataAndNameSectionFilled, expectedStringifiedApiBlueprint };