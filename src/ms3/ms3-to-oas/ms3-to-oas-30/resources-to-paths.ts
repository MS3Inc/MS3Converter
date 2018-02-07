import { securitySchemeType } from '../../../oas/oas-30-api-interface';
import * as OAS from '../../../oas/oas-30-api-interface';
import * as MS3 from '../../ms3-v1-api-interface';
import { filter, find, cloneDeep, pickBy, reduce } from 'lodash';

class ConvertResourcesToPaths {
  constructor(private API: MS3.API) {}

  getSecuritySchemaById(id: string): MS3.SecurityScheme {
    return find(this.API.securitySchemes, ['__id', id]);
  }

  getParentResourcePath(id: string): string {
    return find(this.API.resources, ['__id', id]).path;
  }

  getDataTypeName(id: string): string {
    return find(this.API.dataTypes, (dataType: MS3.DataType) => {
      return (dataType.__id == id) && (dataType.type != 'nil');
    }).name;
  }

  getExampleName(id: string): string {
    return find(this.API.examples, ['__id', id]).title;
  }

  getBodySchema(dataTypeID: string): OAS.ReferenceObject {
    const dataTypeName: string = this.getDataTypeName(dataTypeID);
    return {
      '$ref': `#/components/schemas/${dataTypeName}`
    };
  }

  getBodyExamples(examples: string[]): OAS.Example {
    return examples.reduce( (resultObject: OAS.Example, exampleID: string) => {
      const exampleName: string = this.getExampleName(exampleID);
      resultObject[exampleName] = {
        '$ref': `#/components/examples/${exampleName}`
      };

      return resultObject;
    }, {});
  }

  getRequestBody(body: MS3.Body[]): OAS.MediaType {
    return body.reduce( (resultObject: any, body: MS3.Body) => {
      resultObject[body.contentType] = {};

      if (body.type) resultObject[body.contentType].schema = this.getBodySchema(body.type);
      if (body.selectedExamples) resultObject[body.contentType].examples = this.getBodyExamples(body.selectedExamples);

      return resultObject;
    }, {});
  }

  getResponseHeaders(headers: MS3.Parameter[]): OAS.Headers {
    return headers.reduce( (resultObject: any, header: MS3.Parameter) => {
      resultObject[header.displayName] = {
        required: header.required
      };

      if (header.description) resultObject[header.displayName].description = header.description;
      resultObject[header.displayName].schema = header.repeat ? this.getArrayTypeSchema(header) : this.getPrimitiveTypeSchema(header);
      delete resultObject[header.displayName].schema.name;
      delete resultObject[header.displayName].schema.in;

      return resultObject;
    }, {});
  }

  getResponses(responses: MS3.Response[]): OAS.ResponsesObject {
    return responses.reduce((resultObject: any, response: MS3.Response) => {
      resultObject[response.code] = {
        description: response.description || 'description' // required field
      };

      if (response.body) resultObject[response.code].content = this.getRequestBody(response.body);
      if (response.headers) resultObject[response.code].headers = this.getResponseHeaders(response.headers);

      return resultObject;
    }, {});
  }

  transformParameterObject(parameter: MS3.Parameter) {
    const clonedParameter: any = cloneDeep(parameter);
    delete clonedParameter.displayName;
    delete clonedParameter.description;
    delete clonedParameter.repeat;
    delete clonedParameter.required;
    delete clonedParameter.example;
    if (clonedParameter.maxLength) clonedParameter.maxLength = parseFloat(<string>clonedParameter.maxLength);
    if (clonedParameter.minLength) clonedParameter.minLength = parseFloat(<string>clonedParameter.minLength);
    if (clonedParameter.minimum) clonedParameter.minimum = parseFloat(<string>clonedParameter.minimum);
    if (clonedParameter.maximum) clonedParameter.maximum = parseFloat(<string>clonedParameter.maximum);
    if (clonedParameter.type == 'number') clonedParameter.type = 'long';
    if (clonedParameter.enum && !clonedParameter.enum.length) delete clonedParameter.enum;
    if (clonedParameter.type == 'integer' || clonedParameter.type == 'long') {
      if (clonedParameter.default) clonedParameter.default = parseFloat(<string>clonedParameter.default);
    }

    return pickBy(clonedParameter);
  }

  getArrayTypeSchema(parameter: MS3.Parameter): OAS.SchemaObject {
    const convertedItems: any = this.transformParameterObject(parameter);
    return {
      type: 'array',
      items: convertedItems
    };
  }

  getPrimitiveTypeSchema(parameter: MS3.Parameter): OAS.SchemaObject {
    return this.transformParameterObject(parameter);
  }

  getParametersByType(parameters: MS3.Parameter[], type: string): OAS.ParameterObject[] {
    return parameters.map( (parameter: MS3.Parameter) => {
      const convertedParameter: any = {
        name: parameter.displayName,
        in: type,
        required: type == 'path' ? true : parameter.required || false
      };

      if (parameter.description) convertedParameter.description = parameter.description;
      convertedParameter.schema = parameter.repeat ? this.getArrayTypeSchema(parameter) : this.getPrimitiveTypeSchema(parameter);

      return convertedParameter;
    });
  }

  getParameters(method: MS3.Method): OAS.ParameterObject[] {
    let convertedParameters: OAS.ParameterObject[] = [];

    if (method.headers) convertedParameters = convertedParameters.concat(this.getParametersByType(method.headers, 'header'));
    if (method.queryParameters) convertedParameters = convertedParameters.concat(this.getParametersByType(method.queryParameters, 'path'));

    return convertedParameters;
  }

  getSecurityRequirement(securedBy: string[]): OAS.SecurityRequirement[] {
    return reduce(securedBy, (result: any, id: string): OAS.SecurityRequirement[] => {
      const securitySchema: MS3.SecurityScheme = this.getSecuritySchemaById(id);
      const newObj: OAS.SecurityRequirement = {
        [securitySchema.name]: []
      };
      if (securitySchema.type != 'OAuth 2.0' && securitySchema.type != 'Basic Authentication') return result;

      result.push(newObj);
      return result;
    }, []);
  }

  getMethodObject(method: MS3.Method, methodType: string, pathName: string): OAS.Operation {
    const resultObject: OAS.Operation = {
      operationId: `${pathName}_${methodType}`.toUpperCase(),
      responses: {} // required property
    };

    if (method.description) resultObject.description = method.description;
    if (method.body) resultObject.requestBody = { content: this.getRequestBody(method.body) };
    if (method.responses) resultObject.responses = this.getResponses(method.responses);
    if (method.headers || method.queryParameters) resultObject.parameters = this.getParameters(method);
    if (method.securedBy) resultObject.security = this.getSecurityRequirement(method.securedBy);

    return resultObject;
  }

  convert(): OAS.Paths {
    return this.API.resources.reduce( (resultObject: any, resource: MS3.Resource) => {
      const path = resource.parentId ? (this.getParentResourcePath(resource.parentId) + resource.path) : resource.path;
      resultObject[path] = {};

      const activeMethods = filter(resource.methods, ['active', true]);

      resultObject[path] = activeMethods.reduce( (result: any, activeMethod: MS3.Method) => {
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

  private mergeParentPathVariables(pathVariables: MS3.Parameter[], parentId: string) {
    const parent = find(this.API.resources, ['__id', parentId]);
    if (parent.pathVariables && parent.pathVariables.length) {
      parent.pathVariables.forEach(el => pathVariables.push(el));
    }
    if (parent && parent.parentId) {
      parent.pathVariables = this.mergeParentPathVariables(parent.pathVariables, parent.parentId);
    }

    return pathVariables;
  }

  static create(api: MS3.API) {
    return new ConvertResourcesToPaths(api);
  }
}

export default function convertResourcesToPaths(API: MS3.API): OAS.Paths {
  return ConvertResourcesToPaths.create(API).convert();
}
