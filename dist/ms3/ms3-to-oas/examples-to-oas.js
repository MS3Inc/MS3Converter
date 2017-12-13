"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertInlineExamples(examples) {
    return examples.reduce((resultObject, example) => {
        resultObject[example.title] = { value: example.content };
        return resultObject;
    }, {});
}
exports.convertInlineExamples = convertInlineExamples;
function convertExternalExampleReferences(examples) {
    return examples.reduce((resultObject, example) => {
        resultObject[example.title] = { externalValue: `./examples/${example.title}.${example.format}#${example.title}` };
        return resultObject;
    }, {});
}
exports.convertExternalExampleReferences = convertExternalExampleReferences;
function convertExternalExamples(examples, destinationPath) {
    return examples.map((example) => {
        return {
            content: {
                [example.title]: {
                    value: example.content
                }
            },
            path: `${destinationPath}examples/${example.title}.${example.format}`
        };
    });
}
exports.convertExternalExamples = convertExternalExamples;
//# sourceMappingURL=examples-to-oas.js.map