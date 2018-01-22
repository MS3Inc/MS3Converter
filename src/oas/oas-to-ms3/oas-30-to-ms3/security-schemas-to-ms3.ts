import * as OAS from '../../oas-30-api-interface';
import * as MS3 from '../../../ms3/ms3-v1-api-interface';
import { filter, find, intersection, reduce, union } from 'lodash';
import { v4 } from 'uuid';

class ConvertSecuritySchemes {
  constructor(private schemaObj: OAS.SecurityScheme) {}

  getSecuritySchemeType(type: OAS.securitySchemeType): MS3.securitySchemeType {
    if (type == 'oauth2') return 'OAuth 2.0';
    if (type == 'http') return 'Basic Authentication';
    return null;
  }

  getOAuthFlows(securityScheme: OAS.SecuritySchemeObject): void | object {
    const resultObject: any = {
    };

    const validGrants = intersection(Object.keys(securityScheme.flows), ['implicit', 'password', 'clientCredentials', 'authorizationCode']);
    if (!validGrants.length) return null;

    resultObject.authorizationGrants = validGrants.map((grant) => {
      if (grant == 'clientCredentials') return 'client_credentials';
      if (grant == 'authorizationCode') return 'authorization_code';
      return grant;
    });

    validGrants.forEach( (grant: string) => {
      if (grant == 'implicit' || grant == 'authorizationCode')
        resultObject.authorizationUri = securityScheme.flows[grant].authorizationUrl || 'https://auth.url';
        resultObject.scopes = union(resultObject.scopes, securityScheme.flows[grant].scopes);
      if (grant == 'password' || grant == 'clientCredentials' || grant == 'authorizationCode')
        resultObject.accessTokenUri = securityScheme.flows[grant].tokenUrl || 'https://token.url';
        resultObject.scopes = union(resultObject.scopes, securityScheme.flows[grant].scopes);
    });

    return resultObject;
  }

  getSecurityScheme(securityScheme: OAS.SecuritySchemeObject, type: MS3.securitySchemeType): MS3.SecurityScheme {
    const convertedSecurityScheme: any = {
      __id: v4(),
      type: type
    };

    const settings = this.getOAuthFlows(securityScheme);

    if (type == 'OAuth 2.0' && settings) convertedSecurityScheme.settings = settings;
    if (securityScheme.description) convertedSecurityScheme.description = securityScheme.description;

    return convertedSecurityScheme;
  }

  convert(): MS3.SecurityScheme[] {
    return reduce(this.schemaObj, (resultArray: any, schema: OAS.SecuritySchemeObject, name: string) => {
      const type = this.getSecuritySchemeType(schema.type);
      if (!type) return resultArray;

      const convertedSchema = this.getSecurityScheme(schema, type);
      convertedSchema.name = name;
      resultArray.push(convertedSchema);
      return resultArray;
    }, []);
  }

  static create(schemaObj: OAS.SecurityScheme) {
    return new ConvertSecuritySchemes(schemaObj);
  }
}

export default function convertSecuritySchemes(schemaObj: OAS.SecurityScheme): MS3.SecurityScheme[] {
  return ConvertSecuritySchemes.create(schemaObj).convert();
}