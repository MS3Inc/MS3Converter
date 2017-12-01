import * as ApiBlueprint from '../../blueprint/interfaces/blueprint-interface';
import * as MS3 from '../ms3-v1-api-interface';

export default class MS3UriParametersToParametersSection {
  private parameterSection: ApiBlueprint.ParameterSection;

  constructor(private originalParameters: MS3.Parameter[], options: object) { }

  convert(): ApiBlueprint.ParameterSection {
    return {
      parameterList: this.originalParameters.map((param) => this.convertUriParameter(param)),
      keyword: 'Parameters',
      markdownEntity: 'list'
    };
  }

  convertUriParameter(parameter: MS3.Parameter): ApiBlueprint.Parameter {
    return {
      title: parameter.displayName,
      type: parameter.type, // probably types should be converted to acceptable by Blueprint spec types,
      required: parameter.required,
      exampleValue: parameter.example,
      defaultValue: parameter.default,
      enum: parameter.enum.length > 0,
      members: parameter.enum
    };
  }

  static create(originalParameters: MS3.Parameter[], options: object) {
    return new MS3UriParametersToParametersSection(originalParameters, options);
  }
}