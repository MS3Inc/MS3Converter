import ConvertorInterface from '../../common/convertor-interface';
import * as Ms3 from '../ms3-v1-api-interface';
import * as APIBlueprint from '../../blueprint/interfaces/blueprint-interface';
import * as APIElementsBlueprint from '../../blueprint/interfaces/api-elements-blueprint-interface';
import ConvertorInterfaceOptions from '../../common/convertor-options-interface';
import ConvertResource from './convert-resource';
import ApiBlueprintToString from '../../blueprint/stringify/bluepring-to-string';
import * as path from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFilePromise = promisify(writeFile);

interface DataToWrite {
  path: string;
  content?: APIBlueprint.API;
}

interface APIBConvertorOptionsInterface extends ConvertorInterfaceOptions {
  fileFormat: 'apib';
}

export default class MS3ToBlueprint implements ConvertorInterface {

  private resultApi: any = {};
  private defaultOptions = {
    destinationPath: '',
    asSingleFile: true,
    fileFormat: 'apib'
  };

  constructor (private Ms3Api: Ms3.API, private options: ConvertorInterfaceOptions) {
    Object.assign(this.options, this.defaultOptions);
  }

  convert() {
    Object.assign(this.resultApi, this.convertSettings(this.Ms3Api.settings));
    this.resultApi.resourcesGroup = this.convertResources(this.Ms3Api.resources || []);

    if (this.options.destinationPath && this.options.destinationPath.length)
      return this.writeToDisc({
        path: this.options.destinationPath,
        content: this.resultApi
      });

    return ApiBlueprintToString.create(this.resultApi, {}).stringify();
  }

  private convertResources(ms3Resources: Ms3.Resource[]): APIBlueprint.ResourceGroup {
    return <APIBlueprint.ResourceGroup> {
      keyword: 'Group',
      markdownEntity: 'header',
      identifier: 'Resource group',
      nestedSections: ms3Resources.map((ms3Resource) => ConvertResource.create(ms3Resource).convert())
    };
  }

  private convertSettings(settings: Ms3.Settings) {
    return {
      metadata: this.getMetadataFromMs3(settings),
      name: settings.title,
      description: settings.description
    };
  }

  private getMetadataFromMs3(settings: Ms3.Settings): APIBlueprint.MetadataSection {
    return {
      format: '1A',
      host: settings.baseUri,
      markdownEntity: 'special'
    };
  }

  public static create(MS3Api: Ms3.API, options: ConvertorInterfaceOptions) {
    return new MS3ToBlueprint(MS3Api, options);
  }

  private async writeToDisc(data: DataToWrite) {
    const result = ApiBlueprintToString.create(this.resultApi, {}).stringify();

    await writeFilePromise(data.path, result);
  }
}