"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ConvertResourcesToPaths {
    constructor(API) {
        this.API = API;
    }
    getSecuritySchemaById(id) {
        return lodash_1.find(this.API.securitySchemes, ['__id', id]);
    }
    getParentResourcePath(id) {
        return lodash_1.find(this.API.resources, ['__id', id]).path;
    }
    getDataTypeName(id) {
        return lodash_1.find(this.API.dataTypes, (dataType) => {
            return (dataType.__id == id) && (dataType.type != 'nil');
        }).name;
    }
    getExampleName(id) {
        return lodash_1.find(this.API.examples, ['__id', id]).title;
    }
    getBodySchema(dataTypeID) {
        const dataTypeName = this.getDataTypeName(dataTypeID);
        return {
            '$ref': `#/components/schemas/${dataTypeName}`
        };
    }
    getBodyExamples(examples) {
        return examples.reduce((resultObject, exampleID) => {
            const exampleName = this.getExampleName(exampleID);
            resultObject[exampleName] = {
                '$ref': `#/components/examples/${exampleName}`
            };
            return resultObject;
        }, {});
    }
    getRequestBody(body) {
        return body.reduce((resultObject, body) => {
            resultObject[body.contentType] = {};
            if (body.type)
                resultObject[body.contentType].schema = this.getBodySchema(body.type);
            if (body.selectedExamples)
                resultObject[body.contentType].examples = this.getBodyExamples(body.selectedExamples);
            return resultObject;
        }, {});
    }
    getResponseHeaders(headers) {
        return headers.reduce((resultObject, header) => {
            resultObject[header.displayName] = {
                required: header.required
            };
            if (header.description)
                resultObject[header.displayName].description = header.description;
            resultObject[header.displayName].schema = header.repeat ? this.getArrayTypeSchema(header) : this.getPrimitiveTypeSchema(header);
            delete resultObject[header.displayName].schema.name;
            delete resultObject[header.displayName].schema.in;
            return resultObject;
        }, {});
    }
    getResponses(responses) {
        return responses.reduce((resultObject, response) => {
            resultObject[response.code] = {
                description: response.description || 'description' // required field
            };
            if (response.body)
                resultObject[response.code].content = this.getRequestBody(response.body);
            if (response.headers)
                resultObject[response.code].headers = this.getResponseHeaders(response.headers);
            return resultObject;
        }, {});
    }
    transformParameterObject(parameter) {
        const clonedParameter = lodash_1.cloneDeep(parameter);
        delete clonedParameter.displayName;
        delete clonedParameter.description;
        delete clonedParameter.repeat;
        delete clonedParameter.required;
        delete clonedParameter.example;
        if (clonedParameter.maxLength)
            clonedParameter.maxLength = parseFloat(clonedParameter.maxLength);
        if (clonedParameter.minLength)
            clonedParameter.minLength = parseFloat(clonedParameter.minLength);
        if (clonedParameter.minimum)
            clonedParameter.minimum = parseFloat(clonedParameter.minimum);
        if (clonedParameter.maximum)
            clonedParameter.maximum = parseFloat(clonedParameter.maximum);
        if (clonedParameter.type == 'number')
            clonedParameter.type = 'long';
        if (clonedParameter.enum && !clonedParameter.enum.length)
            delete clonedParameter.enum;
        if (clonedParameter.type == 'integer' || clonedParameter.type == 'long') {
            if (clonedParameter.default)
                clonedParameter.default = parseFloat(clonedParameter.default);
        }
        return lodash_1.pickBy(clonedParameter);
    }
    getArrayTypeSchema(parameter) {
        const convertedItems = this.transformParameterObject(parameter);
        return {
            type: 'array',
            items: convertedItems
        };
    }
    getPrimitiveTypeSchema(parameter) {
        return this.transformParameterObject(parameter);
    }
    getParametersByType(parameters, type) {
        return parameters.map((parameter) => {
            const convertedParameter = {
                name: parameter.displayName,
                in: type,
                required: type == 'path' ? true : parameter.required || false
            };
            if (parameter.description)
                convertedParameter.description = parameter.description;
            convertedParameter.schema = parameter.repeat ? this.getArrayTypeSchema(parameter) : this.getPrimitiveTypeSchema(parameter);
            return convertedParameter;
        });
    }
    getParameters(method) {
        let convertedParameters = [];
        if (method.headers)
            convertedParameters = convertedParameters.concat(this.getParametersByType(method.headers, 'header'));
        if (method.queryParameters)
            convertedParameters = convertedParameters.concat(this.getParametersByType(method.queryParameters, 'query'));
        return convertedParameters;
    }
    getSecurityRequirement(securedBy) {
        return lodash_1.reduce(securedBy, (result, id) => {
            const securitySchema = this.getSecuritySchemaById(id);
            const newObj = {
                [securitySchema.name]: []
            };
            if (securitySchema.type != 'OAuth 2.0' && securitySchema.type != 'Basic Authentication')
                return result;
            result.push(newObj);
            return result;
        }, []);
    }
    getMethodObject(method, methodType, pathName) {
        const resultObject = {
            operationId: `${pathName}_${methodType}`.toUpperCase(),
            responses: {} // required property
        };
        if (method.description)
            resultObject.description = method.description;
        if (method.body)
            resultObject.requestBody = { content: this.getRequestBody(method.body) };
        if (method.responses)
            resultObject.responses = this.getResponses(method.responses);
        if (method.headers || method.queryParameters)
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
            if (resource.parentId) {
                resource.pathVariables = this.mergeParentPathVariables(resource.pathVariables, resource.parentId);
            }
            if (resource.pathVariables && resource.pathVariables.length) {
                resultObject[path].parameters = this.getParametersByType(resource.pathVariables, 'path');
            }
            return resultObject;
        }, {});
    }
    mergeParentPathVariables(pathVariables, parentId) {
        const parent = lodash_1.find(this.API.resources, ['__id', parentId]);
        if (parent.pathVariables && parent.pathVariables.length) {
            parent.pathVariables.forEach(el => pathVariables.push(el));
        }
        if (parent && parent.parentId) {
            parent.pathVariables = this.mergeParentPathVariables(parent.pathVariables, parent.parentId);
        }
        return pathVariables;
    }
    static create(api) {
        return new ConvertResourcesToPaths(api);
    }
}
function convertResourcesToPaths(API) {
    return ConvertResourcesToPaths.create(API).convert();
}
exports.default = convertResourcesToPaths;
//# sourceMappingURL=resources-to-paths.js.map