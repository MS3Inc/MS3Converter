import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';
import AproVersion from '../../../apro_version';

export const oasSettings: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    description: 'API description',
    version: '2.0',
  },
  host: 'base.uri',
  basePath: '/v2',
  schemes: ['http'],
  paths: {}
};

export const ms3Settings: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://base.uri/v2',
    description: 'API description',
    version: '2.0',
    protocols: ['http']
  },
  securitySchemes: [],
  apro_version: AproVersion,
  entityTypeName: 'api',
  dataTypes: [],
  resources: []
};
