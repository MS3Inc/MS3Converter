import * as MS3 from './../../ms3-v1-api-interface';
import { Schema, SchemaObject } from './../../../oas/oas-30-api-interface';
import { DataType, DataTypeObject, DataTypeArray, DataTypePrimitive } from './../../ms3-v1-api-interface';
import { find, cloneDeep } from 'lodash';
import * as path from 'path';

export class ConvertDataTypesToSchemasOAS2 {
  protected baseDefinitionsPath: string = '#/definitions';
  constructor(protected API: MS3.API) {}

  convert(): Schema {
    return this.API.dataTypes.reduce((result: Schema, item: DataType) => {
      const convertedSchema = this.convertSchema(item);
      if (!convertedSchema) return result;
      result[convertedSchema.title] = convertedSchema;
      return result;
    }, {});
  }

  convertExternal(destinationPath: string): object[] {
    return this.API.dataTypes.map((item: DataType) => {
      const convertedSchema = this.convertSchema(item);
      return {
        path: path.join(destinationPath, 'schemas', `${item.name}.json`),
        content: {
          [item.name]: convertedSchema
        }
      };
    });
  }

  convertWithReferences(): Schema {
    return this.API.dataTypes.reduce((result: Schema, item: DataType) => {
      if (!this.convertSchema(item)) return result;

      result[item.name] = {
        '$ref': `./schemas/${item.name}.json#${item.name}`
      };

      return result;
    }, {});
  }

  convertType(dataType: DataType | DataTypeObject | DataTypePrimitive | DataTypeArray ) {
    if (dataType.type == 'nil') return null;
    let convertedType = <any> cloneDeep(dataType);
    delete convertedType.fileTypes;

    convertedType = this.parseIntegerValues(convertedType);

    switch (convertedType.type) {
      case 'number':
        convertedType.type = 'integer';
        break;
      case 'datetime':
        convertedType.type = 'dateTime';
        break;
      case 'date-only':
        convertedType.type = 'date';
        break;
    }

    return convertedType;
  }

  parseIntegerValues(schema: any) {
    if (schema.maxLength && schema.maxLength.length) schema.maxLength = parseFloat(schema.maxLength);
    if (schema.minLength && schema.minLength.length) schema.minLength = parseFloat(schema.minLength);
    if (schema.minimum && schema.minimum.length) schema.minimum = parseFloat(schema.minimum);
    if (schema.maximum && schema.maximum.length) schema.maximum = parseFloat(schema.maximum);
    if (schema.minItems && schema.minItems.length) schema.minItems = parseFloat(schema.minItems);
    if (schema.maxItems && schema.maxItems.length) schema.maxItems = parseFloat(schema.maxItems);
    if (schema.multipleOf && schema.multipleOf.length) schema.multipleOf = parseFloat(schema.multipleOf);
    if (schema.type == 'integer' || schema.type == 'number') {
      if (schema.default && schema.default.length) schema.default = parseFloat(schema.default);
      if (schema.example && schema.example.length) schema.example = parseFloat(schema.example);
    }
    return schema;
  }

  convertSchema(schema: DataType): SchemaObject {
    const convertedSchema = <any> cloneDeep(this.convertType(schema)); // TODO: Refactor this temporary hack to satisfy typescript
    if (!convertedSchema) return convertedSchema;

    convertedSchema.title = convertedSchema.name;
    delete convertedSchema.name;
    delete convertedSchema.__id;

    if (convertedSchema.properties && schema.properties.length) {
      convertedSchema.properties = this.convertProperties(convertedSchema.properties);
    }

    if (convertedSchema.items) {
      convertedSchema.items = this.convertArrayItems(convertedSchema.items);
      if (!convertedSchema.items) {
        delete convertedSchema.items;
      }
    }

    return convertedSchema;
  }

  convertArrayItems(data: DataTypeArray) {
    if (data.includes) {
      const name = this.getSchemaName(data.includes);
      if (!name) return null;

      return {'$ref': `${this.baseDefinitionsPath}/${name}` };
    }
    return this.convertType(data);

  }

  convertProperties(props: Array<object>): Schema {
    return props.reduce( (resultObject: any, prop: (DataTypeObject | DataTypePrimitive | DataTypeArray)) => {
      if (prop.includes) {
        const dataTypeName = this.getSchemaName(prop.includes);
        if (!dataTypeName) {
          delete prop.includes;
          return resultObject;
        }
        resultObject[dataTypeName] = {
          '$ref': `${this.baseDefinitionsPath}/${dataTypeName}`
        };
      } else {
        resultObject[prop.name] = cloneDeep(this.convertType(prop));
        if (!resultObject[prop.name]) {
          delete resultObject[prop.name];
          return resultObject;
        }
        delete resultObject[prop.name].name;
        if (resultObject.properties && resultObject.properties.length) {
          resultObject.properties = this.convertProperties(resultObject.properties);
        }
      }
      return resultObject;
    }, {});
  }

  getSchemaName(id: string): string | null {
    const schema = find(this.API.dataTypes, ['__id', id]);
    return schema.type == 'nil' ? null : schema.name;
  }

  static create(api: MS3.API) {
    return new ConvertDataTypesToSchemasOAS2(api);
  }
}

export function convertDataTypesToSchemas(API: MS3.API): Schema {
  return ConvertDataTypesToSchemasOAS2.create(API).convert();
}

export function convertExternalSchemas(API: MS3.API, schemasPath: string): object[] {
  return ConvertDataTypesToSchemasOAS2.create(API).convertExternal(schemasPath);
}

export function convertExternalSchemasReferences(API: MS3.API): Schema {
  return ConvertDataTypesToSchemasOAS2.create(API).convertWithReferences();
}