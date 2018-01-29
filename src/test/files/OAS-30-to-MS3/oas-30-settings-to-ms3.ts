import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-30-api-interface';
import AproVersion from '../../../apro_version';

export const oasSettings: OASInterface.API = {
  openapi: '3.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '3.0',
  },
  servers: [
    {
      url: 'http://google.com'
    }
  ],
  components: {},
  paths: {}
};

export const ms3Settings: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://google.com',
    description: 'API description',
    version: '3.0'
  },
  apro_version: AproVersion,
  entityTypeName: 'api',
  resources: [],
  examples: [],
  dataTypes: []
};
