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
    description: 'API Description goes here'
};
exports.source = source;
const expected = `FORMAT: 1A
HOST: http://Somehost

#some_name
API Description goes here
`;
exports.expected = expected;
//# sourceMappingURL=blueprint-metadata-and-name-section-api.js.map