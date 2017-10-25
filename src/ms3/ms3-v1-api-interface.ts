import * as Library from './ms3-v1-library-interface';

/**
 * all structure of ms3 should be described in this interface
 */

type mediaType = 'any/*' | 'application/json' | 'application/xml' | 'application/sql' | 'application/pdf' | 'text/plain' | 'text/html' | 'text/xml' | 'text/json' | 'application/octet-stream' | 'application/x-www-form-urlencoded';
type protocol = 'HTTP' | 'HTTPS';
type parameterType = 'string' | 'integer' | 'number' | 'boolean' | 'date';
type datatypeType = 'object' | 'string' | 'integer' | 'number' | 'boolean' | 'array' | 'date-only' | 'time-only' | 'datetime' | 'datetime-only' | 'file' | 'nil';
type numberFormat = 'Int64' | 'Int32' | 'Int16' | 'Int8' | 'Double' | 'Float';
type dateFormat = 'rfc3339' | 'rfc2616';
type exampleFormat = 'json' | 'xml' | 'txt';
type contentType = 'application/json' | 'application/xml' | 'application/sql' | 'application/pdf' | 'text/plain' | 'text/html' | 'text/xml' | 'text/json' | 'application/octet-stream' | 'application/x-www-form-urlencoded';
type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
type entityName = 'api' | 'library' | 'overlay' | 'extension';
type securitySchemeType = 'OAuth 1.0' | 'OAuth 2.0' | 'Basic Authentication' | 'Digest Authentication' | 'Pass Through' | 'x-Other';
type signatures = 'HMAC-SHA1' | 'RSA-SHA1' | 'PLAINTEXT';

interface Parameter {
  type: parameterType;
  displayName: string;
  description?: string;
  default?: string | boolean | number;
  example?: string | boolean | number;
  maxLength?: string | number;
  minLength?: string | number;
  minimum?: string | number;
  maximum?: string | number;
  pattern?: string;
  repeat?: boolean;
  required?: boolean;
  enum?: string[] | number[];
}

interface DataTypePrimitive {
  type: datatypeType;
  name?: string;
  description?: string;
  default?: string | number | boolean;
  example?: string | number | boolean;
  maxLength?: number;
  minLength?: number;
  minimum?: number;
  maximum?: number;
  minProperties?: number;
  maxProperties?: number;
  multipleOf: string | number;
  enum?: string[] | number[];
  fileTypes?: string[];
  pattern?: string;
  format?: numberFormat | dateFormat;
  uniqueItems?: boolean;
}

interface DataTypeObject extends DataTypePrimitive {
  required?: boolean;
  properties?: (DataTypeObject | DataTypePrimitive | DataTypeArray)[];
}

interface DataTypeArray extends DataTypePrimitive {
  includes?: boolean | string;
  items?: DataTypeArray | DataTypePrimitive | DataTypeObject;
}

interface DataType extends DataTypePrimitive {
  __id: string;
  name: string;
  properties?: (DataTypeObject | DataTypePrimitive)[];
  items?: DataTypeArray | DataTypePrimitive;
}

interface Body {
  contentType: contentType;
  selectedExamples?: string[];
  type?: string;
  annotations?: Annotation[];
}

interface Response {
  code: string;
  description?: string;
  annotations?: Annotation[];
  headers?: Parameter[];
  body?: Body[];
}

interface Trait {
  __id: string;
  name: string | methodType;
  description?: string;
  body?: Body[];
  headers?: Parameter[];
  queryParameters?: Parameter[];
  responses?: Response[];
  annotations?: Annotation[];
  selectedTraits?: string[];
}

interface Method extends Trait {
  active: boolean;
  name: methodType;
  securedBy?: string;
}

interface ResourcesType {
  name: string;
  description?: string;
  methods: Method[];
  annotations?: Annotation[];
}

interface Resource extends ResourcesType {
  __id: string;
  path: string;
  pathVariables?: Parameter[];
  securedBy?: string;
  selectedTraits?: string;
  type?: string;
  resources?: Resource[];
  parentId?: string;
}

interface SecurityScheme {
  __id: string;
  name: string;
  type: securitySchemeType;
  description?: string;
  describedBy?: {
    headers?: Parameter[];
    queryParameters?: Parameter[];
    responses?: Response[]
  };
  annotations?: Annotation[];
  settings?: {
    accessTokenUri?: string;
    authorizationUri?: string;
    requestTokenUri?: string;
    tokenCredentialsUri?: string;
    authorizationGrants?: string[];
    scopes?: string[];
    signatures?: signatures[]
  };
}

interface Documentation {
  __id: string;
  name: string;
  description?: string;
  annotations: Annotation[];
}

interface BasicAnnotationType {
  type: 'object' | 'string' | 'integer';
  name: string;
  description?: string;
  pattern?: string;
  enum?: string[];
}

interface PrimitiveAnnotation extends BasicAnnotationType {
  value?: string | number;
}

interface Annotation extends BasicAnnotationType {
  allowedTargets?: string[];
  value?: string | number;
  properties?: PrimitiveAnnotation[];
}

interface PrimitiveAnnotationType extends BasicAnnotationType {
  type: 'string' | 'integer';
}

interface AnnotationType extends BasicAnnotationType {
  allowedTargets?: string[];
  properties?: PrimitiveAnnotationType[];
}

interface Example {
  __id: string;
  title: string; // CHANGE TO NAME
  format: exampleFormat;
  content: string;
  annotations: Annotation[];
}

interface Settings {
  title: string;
  version: string;
  baseUri: string;
  description?: string;
  mediaType?: mediaType[];
  protolos?: protocol[];
  baseUriParameters?: Parameter[];
  securedBy?: string[];
  annotations?: Annotation[];
}

interface Library {
  _id: string;
  refName: string;
  library: Library.Library;
}

interface API {
  entityTypeName: entityName;
  settings: Settings;
  folder?: string[];
  dataTypes?: DataType[];
  resources?: Resource[];
  securitySchemes?: SecurityScheme[];
  resourcesTypes?: ResourcesType[];
  traits?: Trait[];
  documentation?: Documentation[];
  annotationTypes?: AnnotationType[];
  examples?: Example[];
  libraries?: Library[];
}

export {
  API,
  Settings,
  entityName,
  DataType,
  Resource,
  SecurityScheme,
  ResourcesType,
  Trait,
  Documentation,
  AnnotationType,
  Example,
  Library
};