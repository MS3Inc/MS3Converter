import * as ApiBlueprint from '../../../../blueprint/interfaces/blueprint-interface';

const source: ApiBlueprint.API = {
  metadata: {
    markdownEntity: 'special',
    format: '1A',
    host: 'http://Somehost'
  },
  name: 'some_name',
  overview: 'Some overview',
  description: 'API Description goes here'
};

const expected: string = `FORMAT: 1A
HOST: http://Somehost

#some_name
API Description goes here
`;

export { source, expected };