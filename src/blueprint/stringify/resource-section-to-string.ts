import * as ApiBlueprint from '../interfaces/blueprint-interface';
import ActionSectionToString from './action-section-to-string';
import * as common from './common';
import {find as _find } from 'lodash';
import ParametersToString from './parameters-to-string';

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
      result += ParametersToString.create(resource.nestedSections.parameters, {}).stringify(resource.nestedSections.parameters, 0);
    if (resource.nestedSections.actions && resource.nestedSections.actions.length)
      result += this.stringifyActions(<ApiBlueprint.ActionSection[]> resource.nestedSections.actions);

    return result;
  }

  private stringifyActions(actions: ApiBlueprint.ActionSection[], nestLevel: number = 0): string {
    return actions.map((action) => ActionSectionToString.create(action, {}).stringify()).join('/n');
  }

  static create(source: ApiBlueprint.ResourceGroup, options: object) {
    return new ApiBlueprintResourceGroupToString(source, options);
  }

}