"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ConvertResourcesToPaths {
    constructor(API, asSingleFile) {
        this.API = API;
        this.asSingleFile = asSingleFile;
    }
    getSecuritySchemaByName(securitySchemeName) {
        return lodash_1.find(this.API.securitySchemes, ['name', securitySchemeName]);
    }
    getParentResourcePath(id) {
        const path = lodash_1.find(this.API.resources, ['__id', id]).path;
        if (!path)
            throw new Error(`Resource with id "${id}" does not exist.`);
        return path;
    }
    getDataTypeName(id) {
        const name = lodash_1.find(this.API.dataTypes, (dataType) => {
            return (dataType.__id == id) && (dataType.type != 'nil');
        }).name;
        if (!name)
            throw new Error(`DataType with id "${id}" does not exist.`);
        return name;
    }
    getExample(id) {
        const example = lodash_1.find(this.API.examples, ['__id', id]);
        if (!example)
            throw new Error(`Example with id "${id}" does not exist.`);
        return example;
    }
    getExampleName(id) {
        const title = lodash_1.find(this.API.examples, ['__id', id]).title;
        if (!title)
            throw new Error(`Example with id "${id}" does not exist.`);
        return title;
    }
    getResponseHeaders(headers) {
        return headers.reduce((resultObject, header) => {
            resultObject[header.displayName] = this.transformParameterObject(header);
            return resultObject;
        }, {});
    }
    getResponseExamples(selectedExamples, mediaType) {
        if (this.asSingleFile) {
            return selectedExamples.reduce((resultExamples, selectedExample) => {
                const example = this.getExample(selectedExample);
                let isJson;
                try {
                    isJson = JSON.parse(example.content);
                }
                catch (err) { }
                resultExamples[mediaType] = {
                    content: isJson ? isJson : example.content
                };
                return resultExamples;
            }, {});
        }
        else {
            return selectedExamples.reduce((resultExamples, selectedExample) => {
                const exampleName = this.getExampleName(selectedExample);
                resultExamples[exampleName] = {
                    '$ref': `./examples/${exampleName}.json#${exampleName}`
                };
                return resultExamples;
            }, {});
        }
    }
    getResponses(responses) {
        return responses.reduce((resultObject, response) => {
            resultObject[response.code] = {
                description: response.description || 'description' // required field
            };
            if (response.body && response.body.length && response.body[0].type) {
                resultObject[response.code].schema = {
                    '$ref': `#/definitions/${this.getDataTypeName(response.body[0].type)}`
                };
                response.body.forEach(body => {
                    if (response.body[0].selectedExamples) {
                        resultObject[response.code].examples = this.getResponseExamples(body.selectedExamples, response.body[0].contentType);
                    }
                });
            }
            if (response.headers)
                resultObject[response.code].headers = this.getResponseHeaders(response.headers);
            return resultObject;
        }, {});
    }
    transformParameterObject(parameter) {
        const clonedParameter = lodash_1.cloneDeep(parameter);
        delete clonedParameter.displayName;
        delete clonedParameter.repeat;
        delete clonedParameter.example;
        delete clonedParameter.required;
        return clonedParameter;
    }
    getParametersByType(parameters, type) {
        return parameters.map((parameter) => {
            let convertedParameter = {
                name: parameter.displayName,
                in: type
            };
            const parameterProperties = this.transformParameterObject(parameter);
            if (parameter.repeat) {
                convertedParameter = Object.assign({}, convertedParameter, { type: 'array', items: parameterProperties });
                if (parameterProperties.description)
                    convertedParameter.description = parameterProperties.description;
                delete convertedParameter.items.description;
            }
            else {
                convertedParameter = Object.assign({}, convertedParameter, parameterProperties);
            }
            return convertedParameter;
        });
    }
    getBodyParameter(body) {
        const schemaName = this.getDataTypeName(body.type);
        const convertedBody = {
            name: schemaName,
            in: 'body',
            schema: {
                '$ref': `#/definitions/${schemaName}`
            }
        };
        return convertedBody;
    }
    getParameters(method) {
        let convertedParameters = [];
        if (method.headers)
            convertedParameters = convertedParameters.concat(this.getParametersByType(method.headers, 'header'));
        if (method.queryParameters)
            convertedParameters = convertedParameters.concat(this.getParametersByType(method.queryParameters, 'query'));
        if (method.body && method.body.length && method.body[0].type)
            convertedParameters.push(this.getBodyParameter(method.body[0]));
        return convertedParameters;
    }
    getSecurityRequirement(securedBy) {
        return securedBy.reduce((resultArray, securedByName) => {
            const securitySchema = this.getSecuritySchemaByName(securedByName);
            if (securitySchema.type == 'OAuth 2.0') {
                resultArray.push({
                    [securedByName]: securitySchema.settings.scopes
                });
            }
            if (securitySchema.type == 'Basic Authentication') {
                resultArray.push({
                    [securedByName]: []
                });
            }
            return resultArray;
        }, []);
    }
    getMethodObject(method, methodType, pathName) {
        const resultObject = {
            operationId: `${pathName}_${methodType}`.toUpperCase(),
            responses: {} // required property
        };
        if (method.description)
            resultObject.description = method.description;
        if (method.responses)
            resultObject.responses = this.getResponses(method.responses);
        if (method.body || method.headers || method.queryParameters)
            resultObject.parameters = this.getParameters(method);
        if (method.securedBy)
            resultObject.security = this.getSecurityRequirement(method.securedBy);
        return resultObject;
    }
    convert() {
        return this.API.resources.reduce((resultObject, resource) => {
            const path = resource.parentId ? (this.getParentResourcePath(resource.parentId) + resource.path) : resource.path;
            resultObject[path] = {};
            const activeMethods = lodash_1.filter(resource.methods, ['active', true]);
            resultObject[path] = activeMethods.reduce((result, activeMethod) => {
                const methodType = activeMethod.name.toLowerCase();
                result[methodType] = this.getMethodObject(activeMethod, methodType, resource.name);
                return result;
            }, {});
            if (resource.pathVariables && resource.pathVariables.length) {
                resultObject[path].parameters = this.getParametersByType(resource.pathVariables, 'path');
            }
            return resultObject;
        }, {});
    }
    static create(api, asSingleFile) {
        return new ConvertResourcesToPaths(api, asSingleFile);
    }
}
function convertResourcesToPaths(API, asSingleFile = true) {
    return ConvertResourcesToPaths.create(API, asSingleFile).convert();
}
exports.default = convertResourcesToPaths;
//# sourceMappingURL=resources-to-paths.js.map