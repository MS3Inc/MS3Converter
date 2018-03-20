import * as OAS30Interface from '../oas/oas-30-api-interface';
import * as MS3Interface from '../ms3/ms3-v1-api-interface';
import { v4 } from 'uuid';
import { reduce, find } from 'lodash';

class SchemasToDataTypes {
  constructor(private schema: OAS30Interface.Schema, private id: string, private schemas: any[]) {}

  static create(schema: OAS30Interface.Schema, id: string, schemas: any[]) {
    return new SchemasToDataTypes(schema, id, schemas);
  }

  convert(): MS3Interface.DataType {
    return reduce(this.schema, (result: MS3Interface.DataType, schema: OAS30Interface.SchemaObject, name: string) => {
      let dataType: MS3Interface.DataType;
      if (schema.type && (['object', 'array', 'string', 'number', 'integer', 'boolean', 'date', 'file'].indexOf(schema.type) != -1)) {
        try {
          dataType = this._parseProperty(schema);
        } catch (error) {
          throw new Error(`Error parsing data type ${name}: ${error.message}`);
        }
        dataType.__id = this.id ? this.id : v4();
        dataType.name = name;
        return dataType;
      }
    }, {name: ''});
  }

  _parseProperty(schema: OAS30Interface.SchemaObject): MS3Interface.DataType {
    switch (schema.type) {
      case 'array': {
        return this._parseArray(schema);
      }
      case 'object': {
        return this._parseObject(schema);
      }
      default: {
        if (['string', 'number', 'integer', 'boolean', 'date', 'file', 'nil'].indexOf(schema.type) == -1) {
          throw new Error(`Invalid Content: Datatype contains invalid type in property: ${schema.type}`);
        }
        return this._parsePrimitive(schema);
      }
    }
  }

  _parseArray(schema: OAS30Interface.SchemaObject): MS3Interface.DataType {
    const parsedDataType: MS3Interface.DataType = {
      type: undefined,
      description: '',
      example: '',
      maxItems: undefined,
      minItems: undefined,
      uniqueItems: undefined,
      name: ''
    };

    for (const key in parsedDataType) {
      this._addPropertyIfNotEmpty(schema[key], parsedDataType, key);
    }

    const name = schema.displayName ? schema.displayName : schema.fileName;
    if (name && name.length) parsedDataType.name = name;

    if (schema.items) {
      if (schema.items.hasOwnProperty('$ref')) {
        parsedDataType.items = {};
        const refObj = <OAS30Interface.ReferenceObject> schema.items;
        parsedDataType.items.includes = refObj.$ref.split('/')[2];
      }
      else {
        parsedDataType.items = this._parseProperty(schema.items);
      }
    }

    return parsedDataType;
  }

  _parseObject(schema: OAS30Interface.SchemaObject): MS3Interface.DataType {
    const parsedDataType: MS3Interface.DataType = {
      type: undefined,
      description: '',
      example: '',
      name: ''
    };

    for (const key in parsedDataType) {
      this._addPropertyIfNotEmpty(schema[key], parsedDataType, key);
    }
    parsedDataType.properties = this._parseObjectProperties(schema.properties);

    return parsedDataType;
  }

  _parseObjectProperties(properties: OAS30Interface.Schema | OAS30Interface.ReferenceObject): (MS3Interface.DataTypeObject | MS3Interface.DataTypePrimitive | MS3Interface.DataTypeArray)[] {
    const parsedProperties = [];

    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        let property = <OAS30Interface.Schema> properties[key];
        if (property.$ref) {
          const name = property.$ref.split('/')[3];
          const content = find(this.schemas, {name}).content;
          property = JSON.parse(content)[key];
        }
        const parsedProperty = this._parseProperty(property);
        parsedProperty.name = key;
        parsedProperties.push(parsedProperty);
      }
    }

    return parsedProperties;
  }

  _parsePrimitive(schema: OAS30Interface.SchemaObject): MS3Interface.DataType {
    const parsedDataType: MS3Interface.DataType = {
      name: '',
      description: '',
      example: '',
      default: '',
      pattern: '',
      type: undefined,
      minLength: undefined,
      maxLength: undefined,
      minimum: undefined,
      maximum: undefined,
      format: undefined,
      enum: [''],
      fileTypes: undefined,
    };

    for (const key in parsedDataType) {
      this._addPropertyIfNotEmpty(schema[key], parsedDataType, key);
    }

    return parsedDataType;
  }

  _addPropertyIfNotEmpty (sourceValue: string, destinationObject: any, propertyName: any) {
    if (sourceValue !== undefined && sourceValue !== null) {
      if (sourceValue.length || propertyName == 'required' || (typeof(sourceValue) == 'boolean' && sourceValue) || (typeof(sourceValue) == 'number' && !isNaN(sourceValue))) {
        destinationObject[propertyName] = sourceValue;
        return;
      }
    }
    delete destinationObject[propertyName];
  }
}

const convertSchemasToDataTypes =  function(schema: OAS30Interface.Schema, id: string = null, schemas: any[] = []): MS3Interface.DataType {
  return SchemasToDataTypes.create(schema, id, schemas).convert();
};

export default convertSchemasToDataTypes;