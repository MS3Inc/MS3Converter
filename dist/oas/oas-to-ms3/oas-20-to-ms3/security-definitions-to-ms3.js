"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
class ConvertSecuritySchemes {
    constructor(schemaObj) {
        this.schemaObj = schemaObj;
    }
    getSecuritySchemeType(type) {
        if (type == 'oauth2')
            return 'OAuth 2.0';
        if (type == 'basic')
            return 'Basic Authentication';
        return null;
    }
    getOAuthFlows(securityScheme) {
        const resultObject = {};
        if (~['implicit', 'password'].indexOf(securityScheme.flow))
            resultObject.authorizationGrants = [securityScheme.flow];
        if (securityScheme.authorizationUrl)
            resultObject.authorizationUri = securityScheme.authorizationUrl;
        if (securityScheme.tokenUrl)
            resultObject.accessTokenUri = securityScheme.tokenUrl;
        if (securityScheme.scopes)
            resultObject.scopes = Object.keys(securityScheme.scopes);
        return resultObject;
    }
    getSecurityScheme(securityScheme, type) {
        const convertedSecurityScheme = {
            __id: uuid_1.v4(),
            type: type
        };
        const settings = this.getOAuthFlows(securityScheme);
        if (type == 'OAuth 2.0' && settings)
            convertedSecurityScheme.settings = settings;
        if (securityScheme.description)
            convertedSecurityScheme.description = securityScheme.description;
        return convertedSecurityScheme;
    }
    convert() {
        return lodash_1.reduce(this.schemaObj, (resultArray, schema, name) => {
            const type = this.getSecuritySchemeType(schema.type);
            if (!type)
                return resultArray;
            const convertedSchema = this.getSecurityScheme(schema, type);
            convertedSchema.name = name;
            resultArray.push(convertedSchema);
            return resultArray;
        }, []);
    }
    static create(schemaObj) {
        return new ConvertSecuritySchemes(schemaObj);
    }
}
function convertSecuritySchemes(schemaObj) {
    return ConvertSecuritySchemes.create(schemaObj).convert();
}
exports.default = convertSecuritySchemes;
//# sourceMappingURL=security-definitions-to-ms3.js.map