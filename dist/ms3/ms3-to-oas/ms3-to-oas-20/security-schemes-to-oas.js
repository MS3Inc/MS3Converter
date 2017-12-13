"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const basic = 'basic';
const oauth2 = 'oauth2';
class ConvertSecuritySchemes {
    constructor(API) {
        this.API = API;
    }
    getSecuritySchemeType(type) {
        if (type == 'OAuth 2.0')
            return oauth2;
        if (type == 'Basic Authentication')
            return basic;
        return null;
    }
    getScopesObject(scopes) {
        return scopes.reduce((result, scope) => {
            result[scope] = '';
            return result;
        }, {});
    }
    getSecurityScheme(securityScheme, type) {
        const convertedSecurityScheme = { type };
        if (securityScheme.description)
            convertedSecurityScheme.description = securityScheme.description;
        if (type == oauth2) {
            const flows = lodash_1.intersection(securityScheme.settings.authorizationGrants, ['implicit', 'password']);
            if (flows && flows.length)
                convertedSecurityScheme.flow = flows[0];
            if ((convertedSecurityScheme.flow == 'implicit') && securityScheme.settings.authorizationUri)
                convertedSecurityScheme.authorizationUrl = securityScheme.settings.authorizationUri;
            if ((convertedSecurityScheme.flow == 'password') && securityScheme.settings.accessTokenUri)
                convertedSecurityScheme.tokenUrl = securityScheme.settings.accessTokenUri;
            if (securityScheme.settings.scopes)
                convertedSecurityScheme.scopes = this.getScopesObject(securityScheme.settings.scopes);
        }
        return convertedSecurityScheme;
    }
    convert() {
        return this.API.securitySchemes.reduce((resultObject, securityScheme) => {
            const type = this.getSecuritySchemeType(securityScheme.type);
            if (!type)
                return resultObject;
            resultObject[securityScheme.name] = this.getSecurityScheme(securityScheme, type);
            return resultObject;
        }, {});
    }
    static create(api) {
        return new ConvertSecuritySchemes(api);
    }
}
function convertSecuritySchemes(API) {
    return ConvertSecuritySchemes.create(API).convert();
}
exports.default = convertSecuritySchemes;
//# sourceMappingURL=security-schemes-to-oas.js.map