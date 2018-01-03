import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OAS20Interface from '../../../oas/oas-20-api-interface';
import schemaToDataType from '../../schemas-to-dataTypes';
import { reduce, filter, map, find } from 'lodash';
import { v4 } from 'uuid';
import convertSecuritySchemes from './security-definitions-to-ms3';

class MS3toOAS20toMS3 {
  ms3API: MS3Interface.API = {
    entityTypeName: 'api',
    ms3_version: '1.0',
    settings: {
      title: '',
      version: '',
      baseUri: ''
    },
    dataTypes: [],
    examples: []
  };

  constructor(private oasAPI: OAS20Interface.API) {}

  static create(oasAPI: OAS20Interface.API) {
    return new MS3toOAS20toMS3(oasAPI);
  }

  convert() {
    this.ms3API.settings = this.convertSettings();
    this.ms3API.securitySchemes = convertSecuritySchemes(this.oasAPI.securityDefinitions);
    this.ms3API.dataTypes = this.convertDefinitions();
    this.ms3API.resources = this.convertPaths();
    if (this.oasAPI.security) {
      this.ms3API.settings.securedBy = this.getSecuredBy(this.oasAPI.security);
    }

    return this.ms3API;
  }

  private getSecuredBy(securitySchemas: OAS20Interface.SecurityRequirementObject[]): string[] {
    return map(securitySchemas, (schema) => {
      const foundSchema = find(this.ms3API.securitySchemes, {name: Object.keys(schema)[0]});
      return foundSchema.__id;
    });
  }

  private getBaseUri() {
    const host = this.oasAPI.host ? this.oasAPI.host : 'default.com';
    const http = (this.oasAPI.schemes && this.oasAPI.schemes[0]) ? this.oasAPI.schemes[0] : 'http';
    const basePath = this.oasAPI.basePath ? this.oasAPI.basePath : '';
    return `${http}://${host}${basePath}`;
  }

  private convertSettings() {
    const info = this.oasAPI.info;
    const settings: MS3Interface.Settings = {
      title: info.title,
      baseUri: this.getBaseUri(),
      version: info.version,
      protocols: this.oasAPI.schemes
    };
    if (info.description) settings.description = info.description;
    return settings;
  }

  private convertDefinitions(): MS3Interface.DataType[] {
    if (!this.oasAPI.definitions) return [];
    const dataTypes: MS3Interface.DataType[] = [];

    for (const name in this.oasAPI.definitions) {
      if (this.oasAPI.definitions.hasOwnProperty(name)) {
        const schema = <any> {};
        schema[name] = this.oasAPI.definitions[name];
        dataTypes.push(schemaToDataType(schema));
      }
    }
    return dataTypes;
  }

  private convertPaths() {
    return reduce(this.oasAPI.paths, (resultResources: any, pathValue: OAS20Interface.PathItemObject, pathKey: string) => {
      const resource: MS3Interface.Resource = {
        __id: v4(),
        path: pathKey,
        methods: this.convertOperations(pathValue)
      };

      resultResources.push(resource);

      return resultResources;
    }, []);
  }

  private convertOperations(operations: OAS20Interface.PathItemObject | any): MS3Interface.Method[] {
    const methodsKeys = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch'];

    // TODO: Check for other methods default template is needed

    return methodsKeys.reduce((methodsArray: any[], methodKey: string) => {
      const operation: OAS20Interface.OperationObject = operations[methodKey];
      if (!operation) return methodsArray;

      const method: MS3Interface.Method = this.convertOperation(operation, methodKey);
      methodsArray.push(method);

      return methodsArray;
    }, []);
  }

  private convertOperation(operation: OAS20Interface.OperationObject, name: string): MS3Interface.Method {
    const method: MS3Interface.Method = {
      name: name.toUpperCase(),
      active: true
    };

    if (operation.security) method.securedBy = this.getSecuredBy(operation.security);
    if (operation.description) method.description = operation.description;
    const parameters: any = this.getParameters(<OAS20Interface.ParameterObject[]> operation.parameters);

    if (parameters.queryParameters) method.queryParameters = parameters.queryParameters;
    if (parameters.headers) method.headers = parameters.headers;
    if (parameters.body) method.body = parameters.body;
    if (operation.responses) method.responses = this.convertResponses(<OAS20Interface.ResponsesObject>operation.responses);

    return method;
  }

  convertResponses(responses: OAS20Interface.ResponsesObject): MS3Interface.Response[] {
    return reduce(responses, (resultArray: any, response: any, code: string) => {
      const convertedResponse: MS3Interface.Response = {
         code,
         description: response.description,
         body: []
      };

      if (response.schema || response.examples) convertedResponse.body.push({contentType: 'application/json'});

      if (response.schema) {
        convertedResponse.body[0].type = this.createNewDataType(response.schema);
      }

      if (response.examples) {
        convertedResponse.body[0].selectedExamples = this.convertExamples(<OAS20Interface.ExampleObject>response.examples);
      }

      if (response.headers) {
        convertedResponse.headers = this.convertParameters(
          reduce(response.headers, (result: OAS20Interface.ParameterObject[], header: any, name: string): OAS20Interface.ParameterObject[] => {
            header.name = name;
            result.push(header);
            return result;
          }, [])
        );
      }

      resultArray.push(convertedResponse);
      return resultArray;
    }, []);
  }

  private convertExamples(examples: OAS20Interface.ExampleObject): string[] {
    return reduce(examples, (resultArray: any, value: any, key: string) => {
      const ID = v4();
      const title = this.generateExampleUniqName('default_name', 1);
      this.ms3API.examples.push({
        __id: ID,
        title,
        format: 'json',
        content: value
      });

      resultArray.push(ID);
      return resultArray;
    }, []);
  }

  private getParameters(parameters: OAS20Interface.ParameterObject[]): any {
    const query: OAS20Interface.ParameterObject[] = filter(parameters, ['in', 'query']);
    const header: OAS20Interface.ParameterObject[] = filter(parameters, ['in', 'header']);
    const body: OAS20Interface.ParameterObject[] = filter(parameters, ['in', 'body']);

    const convertedParameters: any = {};

    if (query && query.length) convertedParameters.queryParameters = this.convertParameters(query);
    if (header && header.length) convertedParameters.headers = this.convertParameters(header);
    if (body && body.length) convertedParameters.body = this.convertBody(body);

    return convertedParameters;
  }

  convertBody(bodyParameters: OAS20Interface.ParameterObject[]): MS3Interface.Body[] {
    return bodyParameters.map((body) => {
      const parsedBody: MS3Interface.Body = {
        contentType: 'application/json', // default
      };
      if (body.schema) {
        const schemaRef = <OAS20Interface.ReferenceObject> body.schema;
        if (schemaRef.$ref) {
          const name = schemaRef.$ref.split('/').pop();
          const foundSchema = find(this.ms3API.dataTypes, {name});
          if (foundSchema) {
            parsedBody.type = foundSchema.__id;
          } else {
            throw new Error(`Missing referenced schema ${schemaRef.$ref}`);
          }
        } else {
          parsedBody.type = this.createNewDataType(<OAS20Interface.DefinitionsObject> body.schema);
        }
      }
      return parsedBody;
    });
  }

  createNewDataType(schema: OAS20Interface.DefinitionsObject): string {
    const schemaObj = <OAS20Interface.DefinitionsObject> schema;
    const name = this.generateDataTypeUniqName('default_name', 1);
    const newSchema = {
      [name]: schemaObj
    };
    const newDataType = schemaToDataType(newSchema);
    this.ms3API.dataTypes.push(newDataType);
    return newDataType.__id;
  }

  generateExampleUniqName(name: string, counter: number) {
    const uniqName = `${name}_${counter}`;
    const foundExample = find(this.ms3API.examples, {title: uniqName});
    if (!foundExample) return uniqName;
    this.generateExampleUniqName(name, counter++);
  }

  generateDataTypeUniqName(name: string, counter: number) {
    const uniqName = `${name}_${counter}`;
    const foundDataType = find(this.ms3API.dataTypes, {name: uniqName});
    if (!foundDataType) return uniqName;
    this.generateDataTypeUniqName(name, counter++);
  }

  convertParameters(parameters: OAS20Interface.ParameterObject[]) {
    return parameters.map((parameter) => {
      const convertedParameter: MS3Interface.Parameter = {
        displayName: parameter.name,
        type: 'string' // default
      };

      if (parameter.description) convertedParameter.description = parameter.description;
      if (parameter.required) convertedParameter.required = parameter.required;

      if (parameter.pattern) convertedParameter.pattern = parameter.pattern;
      if (parameter.default) convertedParameter.default = parameter.default;
      if (parameter.maxLength) convertedParameter.maxLength = parameter.maxLength;
      if (parameter.minLength) convertedParameter.minLength = parameter.minLength;
      if (parameter.minimum) convertedParameter.minimum = parameter.minimum;
      if (parameter.maximum) convertedParameter.maximum = parameter.maximum;
      if (parameter.enum) convertedParameter.enum = parameter.enum;
      if (parameter.type) {
        if (parameter.type == 'array' && parameter.items && parameter.items.type) {
          convertedParameter.type = <MS3Interface.parameterType> parameter.items.type;
          convertedParameter.repeat = true;
        } else {
          convertedParameter.type = <MS3Interface.parameterType> parameter.type;
        }
      }
      return convertedParameter;
    });
  }
}

export default function convertOAS20toMS3(oasAPI: OAS20Interface.API): any {
  return MS3toOAS20toMS3.create(oasAPI).convert();
}