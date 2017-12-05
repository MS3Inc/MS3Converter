import * as ApiBlueprint from '../interfaces/blueprint-interface';
import * as common from './common';

export default class ResponseToString {

  constructor(private responseSection: ApiBlueprint.ResponseSection, private options: object) {}

  public stringify(responseSection: ApiBlueprint.ResponseSection, nestLevel: number = 0): string {
    let result = '';
    if (responseSection.responseList)
      result += responseSection.responseList.map(this.stringifyResponse.bind(this, nestLevel)).join();

    return result;
  }

  private stringifyResponse(nestLevel: number = 0, response: ApiBlueprint.Response): string {
    let result = common.createListItem(`Response ${response.identifier} (${response.mediaType})`, nestLevel);
    result += common.createListItem(`Body`, nestLevel + 2);
    result += common.createSentence(response.body, false, nestLevel + 4);
    if (response.schema) {
      result += common.createListItem(`Schema`, nestLevel + 2);
      result += common.createSentence(response.schema, false, nestLevel + 4);
    }
    return result;
  }

  static create(source: ApiBlueprint.ResponseSection, options: object) {
    return new ResponseToString(source, options);
  }
}