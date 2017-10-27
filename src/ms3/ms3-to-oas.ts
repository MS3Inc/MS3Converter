import { API as MS3 } from './ms3-v1-api-interface';
import { API as OAS, InfoObject } from './../oas/oas-20-api-interface';

interface MS3toOASInterface {
  oasAPI: OAS;
  convert(): OAS;
}

export default class MS3toOAS implements MS3toOASInterface {
  oasAPI: OAS;

  constructor(private ms3API: MS3) {}

  convertAPI(): OAS {
    this.oasAPI = {
      infoObject: this.convertSettings()
    };
    return this.oasAPI;
  }

  convertOverlay(): OAS {
    // check for extended project and merge overlay
    return this.oasAPI;
  }

  convertExtension(): OAS {
    // check for extended project and merge extension
    return this.oasAPI;
  }

  convert(): OAS {
    switch (this.ms3API.entityTypeName) {
      case 'api':
        return this.convertAPI();
      case 'overlay':
        return this.convertOverlay();
      case 'extension':
        return this.convertExtension();
      case 'library': {
        throw new Error('Library can not be converted to swagger.');
      }
    }
  }

  private convertSettings(): InfoObject {
    if (!this.ms3API.settings.title) {
      throw new Error('MS3 API settings must contain title property.');
    }

    const settings: InfoObject = {
      title: this.ms3API.settings.title,
      description: this.ms3API.settings.description,
      version: this.ms3API.settings.version
    };

    return settings;
  }

  static create(api: MS3) {
    return new MS3toOAS(api);
  }
}