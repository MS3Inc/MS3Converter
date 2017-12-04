import * as ApiBlueprint from '../interfaces/blueprint-interface';
import ActionSectionToString from './action-section-to-string';
import * as common from './common';
import {find as _find } from 'lodash';

export default class ParametersToString {
  private result: string = '';
  private shortDescriptionLength: number = 40;

  constructor(private source: ApiBlueprint.ParameterSection, private options: object) {}

  public stringify(parametersSection: ApiBlueprint.ParameterSection, nestLevel: number = 0): string {
    let result = common.createListItem('Parameters', nestLevel);
    if (parametersSection.parameterList)
      result += parametersSection.parameterList.map(this.stringifyParameter.bind(this, nestLevel)).join();

    return result;
  }

  private stringifyParameter(nestLevel: number = 0, parameter: ApiBlueprint.Parameter): string {
    if (!parameter.type) throw new Error(`Blueprint resource parameter ${parameter.title} stringify failed due to missing type`);
    let result = '';
    const exampleValue: string = parameter.exampleValue ? `: \`${parameter.exampleValue}\`` : '';
    const required: string = parameter.required ? ', required' : '';
    const type: string = parameter.enum ? `enum[${parameter.type}]` : parameter.type;
    const shortDescription: string = parameter.description.length <= this.shortDescriptionLength ? ` - ${parameter.description}` : '';
    result += common.createListItem(`${parameter.title}${exampleValue} (${type}${required})${shortDescription}`, nestLevel + 2);

    if (!shortDescription) result += `\n  ${parameter.description}`;
    if (parameter.members) {
      result += common.createListItem('Members', nestLevel + 4);
      result += parameter.members.map((member) => common.createListItem(common.stringTicks(member), nestLevel + 6, false)).join('');
    }

    return result;
  }

  static create(source: ApiBlueprint.ParameterSection, options: object) {
    return new ParametersToString(source, options);
  }
}