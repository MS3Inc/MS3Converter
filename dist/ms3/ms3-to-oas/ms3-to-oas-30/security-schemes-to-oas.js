"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ConvertSecuritySchemes {
    constructor(API) {
        this.API = API;
    }
    getSecuritySchemeType(type) {
        if (type == 'OAuth 2.0')
            return 'oauth2';
        if (type == 'Basic Authentication')
            return 'http';
        return null;
    }
    getOAuthFlowObject(grant, settings) {
        const resultFlowObject = {};
        if (grant == 'implicit' || grant == 'authorizationCode')
            resultFlowObject.authorizationUrl = settings.authorizationUri || 'https://auth.url';
        if (grant == 'password' || grant == 'clientCredentials' || grant == 'authorizationCode')
            resultFlowObject.tokenUrl = settings.accessTokenUri || 'https://token.url';
        resultFlowObject.scopes = settings.scopes || [];
        return resultFlowObject;
    }
    getOAuthFlows(securityScheme) {
        const resultObject = {};
        const validGrants = lodash_1.intersection(securityScheme.settings.authorizationGrants, ['implicit', 'password', 'client_credentials', 'authorization_code']);
        if (!validGrants.length)
            return null;
        validGrants.forEach((grant) => {
            const grantKey = grant.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            resultObject[grantKey] = this.getOAuthFlowObject(grantKey, securityScheme.settings);
        });
        return resultObject;
    }
    getSecurityScheme(securityScheme, type) {
        const convertedSecurityScheme = {
            type: type
        };
        if (type == 'oauth2' && this.getOAuthFlows(securityScheme))
            convertedSecurityScheme.flows = this.getOAuthFlows(securityScheme);
        if (type == 'http')
            convertedSecurityScheme.scheme = 'basic';
        if (securityScheme.description)
            convertedSecurityScheme.description = securityScheme.description;
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