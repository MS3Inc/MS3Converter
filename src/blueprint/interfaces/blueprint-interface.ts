


export interface NamedSection {
  markdownEntity: 'header'|'list'| 'special';
  keyword: string | null;
  identifier: string; // identifier is any non-empty combination of any character except [, ], (, ) and newline characters. its a name of section
  nestedSections?: NamedSection; // can be NamedSection or FormattedContent(see descendants descriptions)
}

export interface ResourceSection extends NamedSection {

}

export interface Group extends NamedSection {
  entity: 'header';
  keyword: 'Group';
}

export interface ResourceGroup extends Group {
  nestedSection: ResourceSection;
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