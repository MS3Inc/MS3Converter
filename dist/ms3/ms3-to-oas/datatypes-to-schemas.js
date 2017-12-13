"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ConvertDataTypesToSchemas {
    constructor(API) {
        this.API = API;
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
    convertExternal(path) {
        return this.API.dataTypes.map((item) => {
            const convertedSchema = this.convertSchema(item);
            return {
                path: `${path}schemas/${item.name}.json`,
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
    convertType(dataType) {
        if (dataType.type == 'nil')
            return null;
        const convertedType = lodash_1.cloneDeep(dataType);
        delete convertedType.fileTypes;
        switch (convertedType.type) {
            case 'number':
                convertedType.type = 'long';
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
    convertSchema(schema) {
        const convertedSchema = lodash_1.cloneDeep(this.convertType(schema)); // TODO: Refactor this temporary hack to satisfy typescript
        if (!convertedSchema)
            return convertedSchema;
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
    convertArrayItems(data) {
        if (data.includes) {
            const name = this.getSchemaName(data.includes);
            if (!name)
                return null;
            return { '$ref': `#/components/schemas/${name}` };
        }
        return this.convertType(data);
    }
    convertProperties(props) {
        return props.reduce((resultObject, prop) => {
            if (prop.includes) {
                const dataTypeName = this.getSchemaName(prop.includes);
                if (!dataTypeName) {
                    delete prop.includes;
                    return resultObject;
                }
                resultObject[dataTypeName] = {
                    '$ref': `#/components/schemas/${dataTypeName}`
                };
            }
            else {
                resultObject[prop.name] = lodash_1.cloneDeep(this.convertType(prop));
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
    getSchemaName(id) {
        const schema = lodash_1.find(this.API.dataTypes, ['__id', id]);
        return schema.type == 'nil' ? null : schema.name;
    }
    static create(api) {
        return new ConvertDataTypesToSchemas(api);
    }
}
function convertDataTypesToSchemas(API) {
    return ConvertDataTypesToSchemas.create(API).convert();
}
exports.convertDataTypesToSchemas = convertDataTypesToSchemas;
function convertExternalSchemas(API, path) {
    return ConvertDataTypesToSchemas.create(API).convertExternal(path);
}
exports.convertExternalSchemas = convertExternalSchemas;
function convertExternalSchemasReferences(API) {
    return ConvertDataTypesToSchemas.create(API).convertWithReferences();
}
exports.convertExternalSchemasReferences = convertExternalSchemasReferences;
//# sourceMappingURL=datatypes-to-schemas.js.map