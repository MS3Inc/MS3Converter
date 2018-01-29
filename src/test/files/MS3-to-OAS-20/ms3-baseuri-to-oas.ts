import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OASInterface from '../../../oas/oas-20-api-interface';
import AproVersion from '../../../apro_version';

export const ms3APIBaseUri: MS3Interface.API = {
  settings: {
    title: 'params',
    baseUri: 'http://{param}.params.com/{anotherparam}',
  },
  apro_version: AproVersion,
  entityTypeName: 'api'
};

export const OASApiHostAndBasePath: OASInterface.API = {
  swagger: '2.0',
  info: {
    title: 'params',
    version: '2.0'
  },
  host: '{param}.params.com',
  basePath: '/{anotherparam}',
  paths: {}
};