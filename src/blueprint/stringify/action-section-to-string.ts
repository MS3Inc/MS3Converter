import * as ApiBlueprint from '../interfaces/blueprint-interface';
import * as common from './common';
import ParametersToString from './parameters-to-string';

export default class ActionSectionToString {
  private result: string = '';

  constructor(private actionSection: ApiBlueprint.ActionSection, options: object) {
  }

  stringify(): string {
    this.result += common.createSectionHeading('', `[${this.actionSection.keyword}]`, 2);
    this.result += common.createSentence(this.actionSection.description, false);

    if (this.actionSection.nestedSections && this.actionSection.nestedSections.parameters) {
      this.result += ParametersToString.create(this.actionSection.nestedSections.parameters, {}).stringify(this.actionSection.nestedSections.parameters, 0);
    }

    return this.result;
  }

  static create(actionSection: ApiBlueprint.ActionSection, options: object) {
    return new ActionSectionToString(actionSection, options);
  }
}