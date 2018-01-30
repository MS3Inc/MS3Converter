import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';
import AproVersion from '../../../apro_version';

export const ms3Settings: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://params',
  },
  apro_version: AproVersion,
  entityTypeName: 'api'
};

export const oasSettings: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    version: '2.0'
  },
  host: 'params',
  basePath: '/',
  paths: {}
};