import * as OAS from './../../oas/oas-30-api-interface';
import * as MS3 from './../ms3-v1-api-interface';
import * as path from 'path';

export function convertInlineExamples(examples: MS3.Example[]): OAS.Example {
  return examples.reduce( (resultObject: any, example: MS3.Example) => {
    let isJson;
    try {
      isJson = JSON.parse(example.content);
    } catch (err) {}

    resultObject[example.title] = { value: isJson ? isJson : example.content };
    return resultObject;
  }, {});
}

export function convertExternalExampleReferences(examples: MS3.Example[]): OAS.Example {
  return examples.reduce( (resultObject: any, example: MS3.Example) => {
    resultObject[example.title] = { externalValue: `./examples/${example.title}.${example.format}#${example.title}` };
    return resultObject;
  }, {});
}

export function convertExternalExamples(examples: MS3.Example[], destinationPath: string): object[] {
  return examples.map( (example: MS3.Example) => {
    let isJson;
    try {
      isJson = JSON.parse(example.content);
    } catch (err) {}

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