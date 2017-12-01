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
    response?: ResponseSection;
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

export interface ResponseSection {
  keyword: '';
  markdownEntity: 'list';
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