import * as MS3 from '../ms3-v1-api-interface';
import * as Blueprint from '../../blueprint/interfaces/blueprint-interface';
import MS3MethodToActionSection from './convert-method';
import MS3UriParametersToParametersSection from './convert-parameters';

export default class Ms3ResourceToBlueprint {
  private resourceSection: Blueprint.ResourceSection;
  constructor(private Ms3Resource: MS3.Resource) {}

  convert(): Blueprint.ResourceSection {
    this.resourceSection.description = this.Ms3Resource.description;
    this.resourceSection.identifier = this.Ms3Resource.path;
    if (this.Ms3Resource.pathVariables && this.Ms3Resource.pathVariables.length)
      this.resourceSection.nestedSections.parameters = MS3UriParametersToParametersSection.create(this.Ms3Resource.pathVariables, {}).convert();

    if (this.Ms3Resource.methods) {
      const actions = this.convertMethods(this.Ms3Resource.methods);
      if (actions) this.resourceSection.nestedSections.actions = actions;
    }

    // this.resourceSection.nestedSections = this.convertMethods(this.Ms3Resource.methods);
    return this.resourceSection;
  }

  convertMethods(methods: MS3.Method[]): Blueprint.ActionSection[] {
    const activeMethods = methods.filter((method) => method.active);
    if (activeMethods.length)
      return methods.map((method) => MS3MethodToActionSection.create(method, {}).convert());

    return null;
  }


  static create(Ms3Resource: MS3.Resource) {
    return new Ms3ResourceToBlueprint(Ms3Resource);
  }
}