import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';

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
  ms3_version: '1.0',
  entityTypeName: 'api',
};
