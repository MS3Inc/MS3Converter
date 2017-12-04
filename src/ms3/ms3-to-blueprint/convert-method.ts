import * as ApiBlueprint from '../../blueprint/interfaces/blueprint-interface';
import * as MS3 from '../ms3-v1-api-interface';
import MS3UriParametersToParametersSection from './convert-parameters';

export default class MS3MethodToActionSection {
  private actionSection: ApiBlueprint.ActionSection;

  constructor(private method: MS3.Method, options: object) {

  }

  convert(): ApiBlueprint.ActionSection {
    this.actionSection = {
      keyword: this.method.name,
      description: this.method.description,
      markdownEntity: 'header',
      nestedSections: {
        parameters: {
          keyword: 'Parameters',
          identifier: 'parameters',
          markdownEntity: 'list',
          parameterList: MS3UriParametersToParametersSection.create(this.method.queryParameters, {}).convert().parameterList
        }
      }
    };
    return this.actionSection;
  }

  static create(method: MS3.Method, options: object) {
    return new MS3MethodToActionSection(method, options);
  }
}