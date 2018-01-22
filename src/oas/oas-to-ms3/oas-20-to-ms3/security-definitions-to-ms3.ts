import * as OAS from '../../oas-20-api-interface';
import * as MS3 from '../../../ms3/ms3-v1-api-interface';
import { reduce } from 'lodash';
import { v4 } from 'uuid';

class ConvertSecuritySchemes {
  constructor(private schemaObj: OAS.SecurityDefinitionsObject) {}

  private getSecuritySchemeType(type: OAS.securitySchemeType): MS3.securitySchemeType {
    if (type == 'oauth2') return 'OAuth 2.0';
    if (type == 'basic') return 'Basic Authentication';
    return null;
  }
  private getOAuthFlows(securityScheme: OAS.SecuritySchemeObject): void | object {
    const resultObject: any = {
    };

    if (~['implicit', 'password'].indexOf(securityScheme.flow))
      resultObject.authorizationGrants = [securityScheme.flow];
      if (securityScheme.authorizationUrl) resultObject.authorizationUri = securityScheme.authorizationUrl;
      if (securityScheme.tokenUrl) resultObject.accessTokenUri = securityScheme.tokenUrl;
      if (securityScheme.scopes) resultObject.scopes = Object.keys(securityScheme.scopes);

    return resultObject;
  }

  private getSecurityScheme(securityScheme: OAS.SecuritySchemeObject, type: MS3.securitySchemeType): MS3.SecurityScheme {
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

  static create(schemaObj: OAS.SecurityDefinitionsObject) {
    return new ConvertSecuritySchemes(schemaObj);
  }
}

export default function convertSecuritySchemes(schemaObj: OAS.SecurityDefinitionsObject): MS3.SecurityScheme[] {
  return ConvertSecuritySchemes.create(schemaObj).convert();
}