import { datatypeType } from './../../../ms3/ms3-v1-api-interface';
import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OAS20Interface from '../../../oas/oas-20-api-interface';
import schemaToDataType from '../../schemas-to-dataTypes';
import { reduce, filter } from 'lodash';
import { v4 } from 'uuid';

class MS3toOAS20toMS3 {
  ms3API: MS3Interface.API;

  constructor(private oasAPI: OAS20Interface.API) {}

  static create(oasAPI: OAS20Interface.API) {
    return new MS3toOAS20toMS3(oasAPI);
  }

  convert() {
    this.ms3API = {
      entityTypeName: 'api',
      ms3_version: '1.0',
      settings: this.convertSettings(),
      dataTypes: this.convertDefinitions(),
      resources: this.convertPaths()
    };
    return this.ms3API;
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
      const operation: OAS20Interface.Operation = operations[methodKey];
      if (!operation) return methodsArray;

      const method: MS3Interface.Method = this.convertOperation(operation, methodKey);
      methodsArray.push(method);

      return methodsArray;
    }, []);
  }

  private convertOperation(operation: OAS20Interface.Operation, name: string): MS3Interface.Method {
    const method: MS3Interface.Method = {
      name: name.toUpperCase(),
      active: true
    };

    if (operation.description) method.description = operation.description;
    const parameters: any = this.getParameters(operation.parameters);

    if (parameters.queryParameters) method.queryParameters = parameters.queryParameters;
    if (parameters.headers) method.headers = parameters.headers;
    // if (operation.requestBody) method.body = this.convertRequestBody(<OAS20Interface.RequestBodyObject>operation.requestBody);
    // if (operation.responses) method.responses = this.convertResponses(<OAS20Interface.ResponsesObject>operation.responses);

    return method;
  }

  private getParameters(parameters: OAS20Interface.ParameterObject[]): any {
    const query: OAS20Interface.ParameterObject[] = filter(parameters, ['in', 'query']);
    const header: OAS20Interface.ParameterObject[] = filter(parameters, ['in', 'header']);

    const convertedParameters: any = {};

    if (query && query.length) convertedParameters.queryParameters = this.convertParameters(query);
    if (header && header.length) convertedParameters.headers = this.convertParameters(header);

    return convertedParameters;
  }

  convertParameters(parameters: OAS20Interface.ParameterObject[]) {
    return parameters.map((parameter) => {
      const convertedParameter: MS3Interface.Parameter = {
        displayName: parameter.name,
        type: 'string' // default
      };

      if (parameter.description) convertedParameter.description = parameter.description;
      if (parameter.required) convertedParameter.required = parameter.required;

      if (parameter.schema) {
        const schema: any = parameter.schema;
        if (schema.pattern) convertedParameter.pattern = schema.pattern;
        if (schema.default) convertedParameter.default = schema.default;
        if (schema.maxLength) convertedParameter.maxLength = schema.maxLength;
        if (schema.minLength) convertedParameter.minLength = schema.minLength;
        if (schema.minimum) convertedParameter.minimum = schema.minimum;
        if (schema.maximum) convertedParameter.maximum = schema.maximum;
        if (schema.enum) convertedParameter.enum = schema.enum;
        if (schema.type) {
          if (schema.type == 'array' && schema.items && schema.items.type) {
            convertedParameter.type = schema.items.type;
            convertedParameter.repeat = true;
          } else {
            convertedParameter.type = schema.type;
          }
        }
      }
      return convertedParameter;
    });
  }
}

export default function convertOAS20toMS3(oasAPI: OAS20Interface.API): any {
  return MS3toOAS20toMS3.create(oasAPI).convert();
}