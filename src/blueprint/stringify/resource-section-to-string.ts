import * as ApiBlueprint from '../interfaces/blueprint-interface';
import ActionSectionToString from './action-section-to-string';
import * as common from './common';
import {find as _find } from 'lodash';

export default class ApiBlueprintResourceGroupToString {
  private result: string = '';
  private shortDescriptionLength: number = 40;

  constructor(private source: ApiBlueprint.ResourceGroup, private options: object) {}

  stringify() {
    this.result += this.source.nestedSections.map(this.stringifyResource.bind(this));
    return this.result;
  }

  private stringifyResource(resource: ApiBlueprint.ResourceSection): string {
    let result = '';
    result += common.createSectionHeading('', resource.keyword, 1);
    result += common.createSentence(resource.description, false);
    if (resource.nestedSections.parameters)
      result += this.stringifyParameters(<ApiBlueprint.ParameterSection> resource.nestedSections.parameters);
    if (resource.nestedSections.actions && resource.nestedSections.actions.length)
      result += this.stringifyActions(<ApiBlueprint.ActionSection[]> resource.nestedSections.actions);

    return result;
  }

  private stringifyParameters(parametersSection: ApiBlueprint.ParameterSection, nestLevel: number = 0): string {
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

  private stringifyActions(actions: ApiBlueprint.ActionSection[], nestLevel: number = 0): string {
    return actions.map((action) => ActionSectionToString.create(action, {}).stringify()).join('/n');
  }

  static create(source: ApiBlueprint.ResourceGroup, options: object) {
    return new ApiBlueprintResourceGroupToString(source, options);
  }

}