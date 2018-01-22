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
        if (type == 'http')
            return 'Basic Authentication';
        return null;
    }
    getOAuthFlows(securityScheme) {
        const resultObject = {};
        const validGrants = lodash_1.intersection(Object.keys(securityScheme.flows), ['implicit', 'password', 'clientCredentials', 'authorizationCode']);
        if (!validGrants.length)
            return null;
        resultObject.authorizationGrants = validGrants.map((grant) => {
            if (grant == 'clientCredentials')
                return 'client_credentials';
            if (grant == 'authorizationCode')
                return 'authorization_code';
            return grant;
        });
        validGrants.forEach((grant) => {
            if (grant == 'implicit' || grant == 'authorizationCode')
                resultObject.authorizationUri = securityScheme.flows[grant].authorizationUrl || 'https://auth.url';
            resultObject.scopes = lodash_1.union(resultObject.scopes, securityScheme.flows[grant].scopes);
            if (grant == 'password' || grant == 'clientCredentials' || grant == 'authorizationCode')
                resultObject.accessTokenUri = securityScheme.flows[grant].tokenUrl || 'https://token.url';
            resultObject.scopes = lodash_1.union(resultObject.scopes, securityScheme.flows[grant].scopes);
        });
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
//# sourceMappingURL=security-schemas-to-ms3.js.map