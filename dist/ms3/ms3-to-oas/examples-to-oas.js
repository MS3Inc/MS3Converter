"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function convertInlineExamples(examples) {
    return examples.reduce((resultObject, example) => {
        let isJson;
        try {
            isJson = JSON.parse(example.content);
        }
        catch (err) { }
        resultObject[example.title] = { value: isJson ? isJson : example.content };
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
        let isJson;
        try {
            isJson = JSON.parse(example.content);
        }
        catch (err) { }
        return {
            content: {
                [example.title]: {
                    value: isJson ? isJson : example.content
                }
            },
            path: path.join(destinationPath, 'examples', `${example.title}.${example.format}`)
        };
    });
}
exports.convertExternalExamples = convertExternalExamples;
//# sourceMappingURL=examples-to-oas.js.map