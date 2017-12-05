export interface NamedSection {
  markdownEntity: 'header'|'list'| 'special';
  keyword: string | null;
  identifier?: string; // Identifier a name of section. It is any non-empty combination of any character except [, ], (, ) and newline characters.
  nestedSections?: any; // can be NamedSection or FormattedContent(see descendants descriptions)
  description?: string;
}

export interface Group extends NamedSection {
  markdownEntity: 'header';
  keyword: string | 'Group';
}

export interface ResourceGroup extends Group {
  markdownEntity: 'header';
  nestedSections?: ResourceSection[];
}

export interface ResourceSection extends NamedSection {
  nestedSections: {
    parameters?: ParameterSection;
    models?: ModelSection;
    response?: ResponseSection;
    actions: ActionSection[];
  };
}

export interface ModelSection {

}

export interface ParameterSection extends NamedSection {
  markdownEntity: 'list';
  identifier?: 'parameters';
  keyword: 'Parameters';
  parameterList?: Parameter[];
}

export interface Parameter {
  title: string;
  type: string;
  enum?: boolean;
  required?: boolean;
  description?: string;
  exampleValue?: any;
  defaultValue?: any;
  optional?: boolean;
  members?: any[]; // probably each member should have an interface too
}
/**
 * Resource Methods
 */
export interface ActionSection extends NamedSection {
  identifier?: '';
  keyword: 'GET'| 'POST'| 'PUT' | 'PATCH' | 'DELETE' | 'TRACE' | 'OPTIONS' | 'HEAD' | string;
  description: string;
  markdownEntity: 'header';
  nestedSections: {
    parameters?: ParameterSection;
    attributes?: AttributesSection;
    request?: RequestSection;
    responses?: ResponseSection;
  };
}

/**
 * data structure description node
 */
export interface AttributesSection {
  keyword: '';
  markdownEntity: 'list';
}

export interface RequestSection {
  keyword: '';
  markdownEntity: 'list';
}

export interface Response {
  identifier: '100' |'101' |'102' |'200' |'201' |'202' |'203' |'204' |'205' |'206' |'207' |'208' |'226' |'300' |'301' |'302' |'303' |'304' |'305' |'307' |'308' |'400' |'401' |'402' |'403' |'404' |'405' |'406' |'407' |'408' |'409' |'410' |'411' |'412' |'413' |'414' |'415' |'416' |'417' |'421' |'422' |'423' |'424' |'426' |'428' |'429' |'431' |'500' |'501' |'502' |'503' |'504' |'505' |'506' |'507' |'508' |'510' |'511';
  mediaType: 'application/json' | 'application/xml' | 'application/sql' | 'application/pdf' | 'text/plain' | 'text/html' | 'text/xml' | 'text/json' | 'application/octet-stream' | 'application/x-www-form-urlencoded';
  body?: string;
  schema?: string;
}

export interface ResponseSection {
  keyword: 'Response';
  markdownEntity: 'list';
  responseList?: Response[];
}

export interface API {
  metadata: MetadataSection;
  name: string;
  overview?: string;
  description?: string; // API description
  resourceGroup?: ResourceGroup;
}

/**
 * Key-value pairs. Each key is separated from its value by a colon (:).
 * One pair per line. Starts at the beginning of the document
 * and ends with the first Markdown element that is not recognized as a key-value pair.
 */
export interface MetadataSection {
  format: string;
  host: string;
  markdownEntity: 'special' | 'header';
  [key: string]: string;
}

const exampleAPIBlueprint: API = {
  metadata: {
    markdownEntity: 'special',
    format: 'FORMAT 1A',
    host: 'http://Somehost'
  },
  name: 'some_name',
  overview: 'Some overview',
  description: 'API Description goes here'
};