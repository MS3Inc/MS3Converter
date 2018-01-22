"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
class SchemasToDataTypes {
    constructor(schema) {
        this.schema = schema;
    }
    static create(schema) {
        return new SchemasToDataTypes(schema);
    }
    convert() {
        return lodash_1.reduce(this.schema, (result, schema, name) => {
            let dataType;
            if (schema.type && (['object', 'array', 'string', 'number', 'integer', 'boolean', 'date', 'file'].indexOf(schema.type) != -1)) {
                try {
                    dataType = this._parseProperty(schema);
                }
                catch (error) {
                    throw new Error(`Error parsing data type ${name}: ${error.message}`);
                }
            }
            dataType.__id = uuid_1.v4();
            dataType.name = name;
            return dataType;
        }, { name: '' });
    }
    _parseProperty(schema) {
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
    _parseArray(schema) {
        const parsedDataType = {
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
        if (name && name.length)
            parsedDataType.name = name;
        if (schema.items) {
            if (schema.items.hasOwnProperty('$ref')) {
                parsedDataType.items = {};
                const refObj = schema.items;
                parsedDataType.items.includes = refObj.$ref.split('/')[2];
            }
            else {
                parsedDataType.items = this._parseProperty(schema.items);
            }
        }
        return parsedDataType;
    }
    _parseObject(schema) {
        const parsedDataType = {
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
    _parseObjectProperties(properties) {
        const parsedProperties = [];
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                const property = properties[key];
                const parsedProperty = this._parseProperty(property);
                parsedProperty.name = key;
                parsedProperties.push(parsedProperty);
            }
        }
        return parsedProperties;
    }
    _parsePrimitive(schema) {
        const parsedDataType = {
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
    _addPropertyIfNotEmpty(sourceValue, destinationObject, propertyName) {
        if (sourceValue !== undefined && sourceValue !== null) {
            if (sourceValue.length || propertyName == 'required' || (typeof (sourceValue) == 'boolean' && sourceValue) || (typeof (sourceValue) == 'number' && !isNaN(sourceValue))) {
                destinationObject[propertyName] = sourceValue;
                return;
            }
        }
        delete destinationObject[propertyName];
    }
}
const convertSchemasToDataTypes = function (schema) {
    return SchemasToDataTypes.create(schema).convert();
};
exports.default = convertSchemasToDataTypes;
//# sourceMappingURL=schemas-to-dataTypes.js.map