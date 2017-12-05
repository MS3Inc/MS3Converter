import { ResourceSection } from './../../blueprint/interfaces/blueprint-interface';
import * as ApiBlueprint from '../../blueprint/interfaces/blueprint-interface';
import * as MS3 from '../ms3-v1-api-interface';
import MS3UriParametersToParametersSection from './convert-parameters';
import { reduce } from 'lodash';

export default class MS3ResponsesToResponseSection {

  constructor(private responses: MS3.Response[], options: object) {

  }

  convert(): ApiBlueprint.Response[] | any[] {
    return <ApiBlueprint.Response[] | any[]> this.responses.reduce((result, response) => {
      if (response.body && response.body.length) {
        return result.push({
          identifier: response.code,
          mediaType: response.body[0].contentType,
          body: response.body[0].selectedExamples[0],
          schema: response.body[0].type
        });
      }
      return result;
    }, []);
  }

  static create(responses: MS3.Response[], options: object) {
    return new MS3ResponsesToResponseSection(responses, options);
  }
}