"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_to_dataTypes_1 = require("../../schemas-to-dataTypes");
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const security_definitions_to_ms3_1 = require("./security-definitions-to-ms3");
const apro_version_1 = require("../../../apro_version");
class MS3toOAS20toMS3 {
    constructor(oasAPI) {
        this.oasAPI = oasAPI;
        this.ms3API = {
            entityTypeName: 'api',
            apro_version: apro_version_1.default,
            settings: {
                title: '',
                version: '',
                baseUri: ''
            },
            dataTypes: []
        };
    }
    static create(oasAPI) {
        return new MS3toOAS20toMS3(oasAPI);
    }
    convert() {
        this.ms3API.settings = this.convertSettings();
        this.ms3API.securitySchemes = security_definitions_to_ms3_1.default(this.oasAPI.securityDefinitions);
        this.ms3API.dataTypes = this.convertDefinitions();
        this.ms3API.resources = this.convertPaths();
        if (this.oasAPI.security) {
            this.ms3API.settings.securedBy = this.getSecuredBy(this.oasAPI.security);
        }
        return this.ms3API;
    }
    getSecuredBy(securitySchemas) {
        return lodash_1.map(securitySchemas, (schema) => {
            const foundSchema = lodash_1.find(this.ms3API.securitySchemes, { name: Object.keys(schema)[0] });
            return foundSchema.__id;
        });
    }
    getBaseUri() {
        const host = this.oasAPI.host ? this.oasAPI.host : 'default.com';
        const http = (this.oasAPI.schemes && this.oasAPI.schemes[0]) ? this.oasAPI.schemes[0] : 'http';
        const basePath = this.oasAPI.basePath ? this.oasAPI.basePath : '';
        return `${http}://${host}${basePath}`;
    }
    convertSettings() {
        const info = this.oasAPI.info;
        const settings = {
            title: info.title,
            baseUri: this.getBaseUri(),
            version: info.version,
            protocols: this.oasAPI.schemes ? this.oasAPI.schemes : ['HTTP']
        };
        if (info.description)
            settings.description = info.description;
        return settings;
    }
    convertDefinitions() {
        if (!this.oasAPI.definitions)
            return [];
        const dataTypes = [];
        for (const name in this.oasAPI.definitions) {
            if (this.oasAPI.definitions.hasOwnProperty(name)) {
                const schema = {};
                schema[name] = this.oasAPI.definitions[name];
                dataTypes.push(schemas_to_dataTypes_1.default(schema));
            }
        }
        return dataTypes;
    }
    convertPaths() {
        return lodash_1.reduce(this.oasAPI.paths, (resultResources, pathValue, pathKey) => {
            const resource = {
                __id: uuid_1.v4(),
                path: pathKey,
                methods: this.convertOperations(pathValue)
            };
            resultResources.push(resource);
            return resultResources;
        }, []);
    }
    convertOperations(operations) {
        const methodsKeys = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch'];
        // TODO: Check for other methods default template is needed
        return methodsKeys.reduce((methodsArray, methodKey) => {
            const operation = operations[methodKey];
            if (!operation)
                return methodsArray;
            const method = this.convertOperation(operation, methodKey);
            methodsArray.push(method);
            return methodsArray;
        }, []);
    }
    convertOperation(operation, name) {
        const method = {
            name: name.toUpperCase(),
            active: true
        };
        if (operation.security)
            method.securedBy = this.getSecuredBy(operation.security);
        if (operation.description)
            method.description = operation.description;
        const parameters = this.getParameters(operation.parameters);
        if (parameters.queryParameters)
            method.queryParameters = parameters.queryParameters;
        if (parameters.headers)
            method.headers = parameters.headers;
        if (parameters.body)
            method.body = parameters.body;
        if (operation.responses)
            method.responses = this.convertResponses(operation.responses);
        return method;
    }
    convertResponses(responses) {
        return lodash_1.reduce(responses, (resultArray, value, key) => {
            const convertedResponse = {
                code: key,
                description: value.description,
            };
            const body = {
                contentType: 'application/json',
                type: '',
                selectedExamples: []
            };
            if (value.schema && value.schema.$ref) {
                const splitArr = value.schema.$ref.split('/');
                const name = splitArr.pop();
                body.type = this.getRefId(name);
            }
            else if (value.schema) {
                body.type = uuid_1.v4();
                value.schema.__id = body.type;
                this.ms3API.dataTypes.push(value.schema);
            }
            if (value.examples) {
                body.selectedExamples = this.convertExamples(value.examples);
            }
            if (value.schema || value.examples) {
                convertedResponse.body = [];
                convertedResponse.body.push(body);
            }
            if (value.headers) {
                const headers = lodash_1.reduce(value.headers, (result, value, key) => {
                    value.name = key;
                    result.push(value);
                    return result;
                }, []);
                if (headers.length) {
                    convertedResponse.headers = this.convertParameters(headers);
                }
            }
            resultArray.push(convertedResponse);
            return resultArray;
        }, []);
    }
    convertExamples(examples) {
        return lodash_1.reduce(examples, (resultArray, value, key) => {
            const ID = uuid_1.v4();
            if (!this.ms3API.examples)
                this.ms3API.examples = [];
            this.ms3API.examples.push({
                __id: ID,
                title: 'Examples-' + (this.ms3API.examples.length + 1),
                format: 'json',
                content: JSON.stringify(value)
            });
            resultArray.push(ID);
            return resultArray;
        }, []);
    }
    getRefId(name) {
        const foundDataType = lodash_1.find(this.ms3API.dataTypes, { name });
        return foundDataType.__id;
    }
    getParameters(parameters) {
        const query = lodash_1.filter(parameters, ['in', 'query']);
        const header = lodash_1.filter(parameters, ['in', 'header']);
        const body = lodash_1.filter(parameters, ['in', 'body']);
        const convertedParameters = {};
        if (query && query.length)
            convertedParameters.queryParameters = this.convertParameters(query);
        if (header && header.length)
            convertedParameters.headers = this.convertParameters(header);
        if (body && body.length)
            convertedParameters.body = this.convertBody(body);
        return convertedParameters;
    }
    convertBody(bodyParameters) {
        return bodyParameters.map((body) => {
            const parsedBody = {
                contentType: 'application/json',
            };
            if (body.schema) {
                const schemaRef = body.schema;
                if (schemaRef.$ref) {
                    const name = schemaRef.$ref.split('/').pop();
                    const foundSchema = lodash_1.find(this.ms3API.dataTypes, { name });
                    if (foundSchema) {
                        parsedBody.type = foundSchema.__id;
                    }
                    else {
                        throw new Error(`Missing referenced schema ${schemaRef.$ref}`);
                    }
                }
                else {
                    const schemaObj = body.schema;
                    const name = this.generateUniqName('default_name', 1);
                    const schema = {
                        [name]: schemaObj
                    };
                    const newDataType = schemas_to_dataTypes_1.default(schema);
                    parsedBody.type = newDataType.__id;
                    this.ms3API.dataTypes.push(newDataType);
                }
            }
            return parsedBody;
        });
    }
    generateUniqName(name, counter) {
        const uniqName = `${name}_${counter}`;
        const foundDataType = lodash_1.find(this.ms3API.dataTypes, { name: uniqName });
        if (!foundDataType)
            return uniqName;
        this.generateUniqName(name, counter++);
    }
    convertParameters(parameters) {
        return parameters.map((parameter) => {
            const convertedParameter = {
                displayName: parameter.name,
                type: 'string' // default
            };
            if (parameter.description)
                convertedParameter.description = parameter.description;
            if (parameter.required)
                convertedParameter.required = parameter.required;
            if (parameter.pattern)
                convertedParameter.pattern = parameter.pattern;
            if (parameter.default)
                convertedParameter.default = parameter.default;
            if (parameter.maxLength)
                convertedParameter.maxLength = parameter.maxLength;
            if (parameter.minLength)
                convertedParameter.minLength = parameter.minLength;
            if (parameter.minimum)
                convertedParameter.minimum = parameter.minimum;
            if (parameter.maximum)
                convertedParameter.maximum = parameter.maximum;
            if (parameter.enum)
                convertedParameter.enum = parameter.enum;
            if (parameter.type) {
                if (parameter.type == 'array' && parameter.items && parameter.items.type) {
                    convertedParameter.type = parameter.items.type;
                    convertedParameter.repeat = true;
                }
                else {
                    convertedParameter.type = parameter.type;
                }
            }
            return convertedParameter;
        });
    }
}
function convertOAS20toMS3(oasAPI) {
    return MS3toOAS20toMS3.create(oasAPI).convert();
}
exports.default = convertOAS20toMS3;
//# sourceMappingURL=index.js.map