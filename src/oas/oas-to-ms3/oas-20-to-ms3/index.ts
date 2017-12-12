import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OAS20Interface from '../../../oas/oas-20-api-interface';

class MS3toOAS20toMS3 {
  ms3API: MS3Interface.API;

  constructor(private oasAPI: OAS20Interface.API) {}

  static create(oasAPI: OAS20Interface.API) {
    return new MS3toOAS20toMS3(oasAPI);
  }

  convert() {
    this.ms3API = {
      entityTypeName: 'api',
      ms3_version: '1.0',
      settings: this.convertSettings()
    };
    return this.ms3API;
  }

  private getBaseUri() {
    const host = this.oasAPI.host ? this.oasAPI.host : 'default.com';
    const http = (this.oasAPI.schemes && this.oasAPI.schemes[0]) ? this.oasAPI.schemes[0] : 'http';
    const basePath = this.oasAPI.basePath ? this.oasAPI.basePath : '';
    return `${http}://${host}${basePath}`;
  }

  private convertSettings() {
    const info = this.oasAPI.info;
    const settings: MS3Interface.Settings = {
      title: info.title,
      baseUri: this.getBaseUri(),
      version: info.version,
      protocols: this.oasAPI.schemes
    };
    if (info.description) settings.description = info.description;
    return settings;
  }
}

export default function convertOAS20toMS3(oasAPI: OAS20Interface.API): any {
  return MS3toOAS20toMS3.create(oasAPI).convert();
}