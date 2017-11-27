import * as MS3 from '../ms3-v1-api-interface';
import * as Blueprint from '../../blueprint/interfaces/blueprint-interface';

export default class Ms3ResourceToBlueprint {
  private resourceSection: Blueprint.ResourceSection;
  constructor(private Ms3Resource: MS3.Resource) {}

  convert(): Blueprint.ResourceSection {
    this.resourceSection.description = this.Ms3Resource.description;
    this.resourceSection.identifier = this.Ms3Resource.path;
    this.resourceSection.nestedSections = [this.convertUriParameters(this.Ms3Resource.pathVariables)];

    // this.resourceSection.nestedSections = this.convertMethods(this.Ms3Resource.methods); 
    return this.resourceSection;
  }
  convertUriParameters(uriParams: MS3.Parameter[]): Blueprint.ParameterSection {
    return {
      parameterList: uriParams.map((param) => this.convertUriParameter(param)),
      keyword: 'Parameters',
      markdownEntity: 'list'
    };
}

  convertUriParameter(parameter: MS3.Parameter): Blueprint.Parameter {

    return {
      title: parameter.displayName,
      type: parameter.type, // probably types should be converted to acceptable types,
      required: parameter.required,
      exampleValue: parameter.example,
      defaultValue: parameter.default,
      enum: parameter.enum.length > 0,
      members: parameter.enum
    };
  }

  // convertMethods(methods: MS3.Method[]): Blueprint.action[] {

  // }

  // convertMethod(method: MS3.Method): Blueprint.action {

  // }


  static create(Ms3Resource: MS3.Resource) {
    return new Ms3ResourceToBlueprint(Ms3Resource);
  }
}