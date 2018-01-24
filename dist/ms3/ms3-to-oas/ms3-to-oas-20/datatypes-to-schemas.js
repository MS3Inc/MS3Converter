"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const path = require("path");
class ConvertDataTypesToSchemasOAS2 {
    constructor(API) {
        this.API = API;
        this.baseDefinitionsPath = '#/definitions';
    }
    convert() {
        return this.API.dataTypes.reduce((result, item) => {
            const convertedSchema = this.convertSchema(item);
            if (!convertedSchema)
                return result;
            result[convertedSchema.title] = convertedSchema;
            return result;
        }, {});
    }
    convertExternal(destinationPath) {
        return this.API.dataTypes.map((item) => {
            const convertedSchema = this.convertSchema(item);
            return {
                path: path.join(destinationPath, 'schemas', `${item.name}.json`),
                content: {
                    [item.name]: convertedSchema
                }
            };
        });
    }
    convertWithReferences() {
        return this.API.dataTypes.reduce((result, item) => {
            if (!this.convertSchema(item))
                return result;
            result[item.name] = {
                '$ref': `./schemas/${item.name}.json#${item.name}`
            };
            return result;
        }, {});
    }
    /**
     * Convert datatype type field to types compatible with json schema
     * @param dataType - data type
     */
    convertType(dataType) {
        if (dataType.type == 'nil')
            return null;
        let convertedType = lodash_1.cloneDeep(dataType);
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
    parseIntegerValues(schema) {
        if (schema.maxLength && schema.maxLength.length)
            schema.maxLength = parseFloat(schema.maxLength);
        if (schema.minLength && schema.minLength.length)
            schema.minLength = parseFloat(schema.minLength);
        if (schema.minimum && schema.minimum.length)
            schema.minimum = parseFloat(schema.minimum);
        if (schema.maximum && schema.maximum.length)
            schema.maximum = parseFloat(schema.maximum);
        if (schema.minItems && schema.minItems.length)
            schema.minItems = parseFloat(schema.minItems);
        if (schema.maxItems && schema.maxItems.length)
            schema.maxItems = parseFloat(schema.maxItems);
        if (schema.multipleOf && schema.multipleOf.length)
            schema.multipleOf = parseFloat(schema.multipleOf);
        if (schema.type == 'integer' || schema.type == 'number') {
            if (schema.default && schema.default.length)
                schema.default = parseFloat(schema.default);
            if (schema.example && schema.example.length)
                schema.example = parseFloat(schema.example);
        }
        return schema;
    }
    convertSchema(schema) {
        const convertedSchema = lodash_1.cloneDeep(this.convertType(schema)); // TODO: Refactor this temporary hack to satisfy typescript
        if (!convertedSchema)
            return convertedSchema;
        convertedSchema.title = convertedSchema.name;
        delete convertedSchema.name;
        delete convertedSchema.__id;
        if (convertedSchema.properties && schema.properties.length) {
            const required = this.getRequiredPropertiesFromDataType(convertedSchema.properties);
            if (required.length)
                convertedSchema.required = required;
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
    convertArrayItems(data) {
        if (data.includes) {
            const name = this.getSchemaName(data.includes);
            if (!name)
                return null;
            return { '$ref': `${this.baseDefinitionsPath}/${name}` };
        }
        return this.convertType(data);
    }
    getRequiredPropertiesFromDataType(props) {
        return props.reduce((resultArray, prop) => {
            if (prop.hasOwnProperty('required') && prop.required)
                resultArray.push(prop.name);
            return resultArray;
        }, []);
    }
    convertProperties(props) {
        return props.reduce((resultObject, prop) => {
            if (prop.required)
                delete prop.required;
            if (prop.includes) {
                const dataTypeName = this.getSchemaName(prop.includes);
                if (!dataTypeName) {
                    delete prop.includes;
                    return resultObject;
                }
                resultObject[dataTypeName] = {
                    '$ref': `${this.baseDefinitionsPath}/${dataTypeName}`
                };
            }
            else {
                resultObject[prop.name] = lodash_1.cloneDeep(this.convertType(prop));
                if (!resultObject[prop.name]) {
                    delete resultObject[prop.name];
                    return resultObject;
                }
                delete resultObject[prop.name].name;
                if (resultObject[prop.name].items) {
                    resultObject[prop.name].items = this.convertArrayItems(resultObject[prop.name].items);
                }
                if (resultObject[prop.name].properties && resultObject[prop.name].properties.length) {
                    const required = this.getRequiredPropertiesFromDataType(resultObject[prop.name].properties);
                    if (required.length)
                        resultObject[prop.name].required = required;
                    resultObject[prop.name].properties = this.convertProperties(resultObject[prop.name].properties);
                }
            }
            return resultObject;
        }, {});
    }
    getSchemaName(id) {
        const schema = lodash_1.find(this.API.dataTypes, ['__id', id]);
        return schema.type == 'nil' ? null : schema.name;
    }
    static create(api) {
        return new ConvertDataTypesToSchemasOAS2(api);
    }
}
exports.ConvertDataTypesToSchemasOAS2 = ConvertDataTypesToSchemasOAS2;
function convertDataTypesToSchemas(API) {
    return ConvertDataTypesToSchemasOAS2.create(API).convert();
}
exports.convertDataTypesToSchemas = convertDataTypesToSchemas;
function convertExternalSchemas(API, schemasPath) {
    return ConvertDataTypesToSchemasOAS2.create(API).convertExternal(schemasPath);
}
exports.convertExternalSchemas = convertExternalSchemas;
function convertExternalSchemasReferences(API) {
    return ConvertDataTypesToSchemasOAS2.create(API).convertWithReferences();
}
exports.convertExternalSchemasReferences = convertExternalSchemasReferences;
//# sourceMappingURL=datatypes-to-schemas.js.map