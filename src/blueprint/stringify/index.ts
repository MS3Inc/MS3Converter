import * as ApiBlueprint from '../interfaces/blueprint-interface';
import ApiBlueprintResourceGroupToString from './resource-section-to-string';

export default class ApiBlueprintToString {
  private result: string = '';

  constructor(private source: ApiBlueprint.API, private options: object) {}

  stringify() {
    this.result += this.stringifyMetaData(this.source.metadata);
    this.result += ApiBlueprintToString.stringifyNameSection(this.source);
    if (this.source.resourceGroup)
      this.result += ApiBlueprintResourceGroupToString.create(this.source.resourceGroup, {}).stringify();
    return this.result;
  }

  private stringifyMetaData(metadata: ApiBlueprint.MetadataSection) {
    let result = `FORMAT: ${this.source.metadata.format ? this.source.metadata.format : '1A'}\n`;
    if (this.source.metadata.host) result += `HOST: ${this.source.metadata.host}\n`;

    return result;
  }

  public static stringifyNameSection(api: ApiBlueprint.API) {
    let result = '';

    if (api.name) result += ApiBlueprintToString.createSectionHeading(api.name);
    if (api.description) result += `${api.description}\n`;

    return result;
  }

  static createSectionHeading(content: string, level: 1|2 = 1) {
    return `\n${'#'.repeat(level)}${content}\n`;
  }

  static create(source: ApiBlueprint.API, options: object) {
    return new ApiBlueprintToString(source, options);
  }

}