import * as MS3 from './../../ms3-v1-api-interface';
import { Schema, SchemaObject } from './../../../oas/oas-30-api-interface';
import { DataType, DataTypeObject, DataTypeArray, DataTypePrimitive } from './../../ms3-v1-api-interface';
import { ConvertDataTypesToSchemasOAS2 } from '../ms3-to-oas-20/datatypes-to-schemas';
import { find, cloneDeep } from 'lodash';
import * as path from 'path';

class ConvertDataTypesToSchemas extends ConvertDataTypesToSchemasOAS2 {
  protected baseDefinitionsPath: string = '#/components';

  static create(api: MS3.API) {
    return new ConvertDataTypesToSchemas(api);
  }
}

export function convertDataTypesToSchemas(API: MS3.API): Schema {
  return ConvertDataTypesToSchemas.create(API).convert();
}

export function convertExternalSchemas(API: MS3.API, schemasPath: string): object[] {
  return ConvertDataTypesToSchemas.create(API).convertExternal(schemasPath);
}

export function convertExternalSchemasReferences(API: MS3.API): Schema {
  return ConvertDataTypesToSchemas.create(API).convertWithReferences();
}