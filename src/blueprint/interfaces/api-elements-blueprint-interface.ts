
interface RefElement {
  element?: string; // ref (string, fixed)
  attributes?: {
    path: StringElement[]; // (enum[String Element]) - Path of referenced element to transclude instead of element itself
    element: string; // (default) - The complete referenced element
    meta: Meta; // - The meta data of the referenced element
    attributes: Attribute[]; // - The attributes of the referenced element
    content: any; // - The content of the referenced element
  };
  content?: string; // (required, string) - A URL to an ID of an element in the current document
}

interface Element {
  element: string;
  content: any;
}

interface StringElement extends Element {
  element: 'string';
}

interface Attribute {
  element: string;
  content: Element;
}

interface LinkElement {
  element?: string; // link (string, fixed)
  attributes?: {
    relation: string; // (string) - Link relation type as specified in RFC 5988.
    href: string; // (string) - The URI for the given link
  };
}

export interface Meta {
  id: string; // (String Element) - Unique Identifier, MUST be unique throughout the document
  ref?: RefElement; // (Ref Element) - Pointer to referenced element or type
  classes?: StringElement[]; // (Array Element[String Element]) - Array of classifications for given element
  title?: StringElement; // (String Element) - Human-readable title of element
  description?: StringElement; // (String Element) - Human-readable description of element
  links?: LinkElement[]; // (Array Element[Link Element]) - Meta links for a given element
}

export interface BaseApiElement {
  attributes?: Attribute[];
  element?: string;
  meta?: Meta;
  content?: any;
}


//*** mine experimental according to Drafter js parsed object */
export interface ExApi {
  element: 'api';
  meta: Array<ExAPiMetaElement>;

}

export interface ExAPiMetaElement {
  element: 'member';
  content: any;
  meta: {
    classes: string[];
  };
}


// not yet sure what that is
// seems like uri href without template(pathVariables)
interface Href extends StringElement {

}

// not yet sure what that is
// seems to be uri with pathVariables
interface TemplatedHref extends StringElement {

}

// seems to be pathVariables
interface HrefVariables extends Element {
  element: 'hrefVariables';
}

interface DataStructureElement extends Element {

}

interface DataStructure extends Element {
  element: 'dataStructure';
  content: DataStructureElement;
}

interface AssetClassesItemContentElement {
  content: {
    messageBody: string; // (string) - Asset is an example of message-body
    messageBodySchema: string; // (string) - Asset is an schema for message-body
  };
}

// item used in Asset->meta->classes section
interface AssetClassesItem {
  content: AssetClassesItemContentElement;
}

// must be dataTYpe or example description (Arbitrary data asset.)
// should extend BaseApiElement but not sure yet about type of attributes property which is hash or array?
interface Asset extends Element {
  element: 'asset';
  meta: {
    classes: AssetClassesItem[];
  };
  attributes: {
    contentType: StringElement; // - Optional media type of the asset. When this is unset, the content type SHOULD be inherited from the Content-Type header of a parent HTTP Message Payload
    href: Href; // link to asset - not yet sure what that means
  };
  content: string; // A textual representation of the asset
}

interface Resource extends Element {
  element: 'resource';
  attributes: {
    href: TemplatedHref; // URI Template of this resource.
    hrefVariables: HrefVariables; // Definition of URI Template variables used in the href property.
  };
  content: ( Copy | Category | Transition | DataStructure )[]; // content should not include more than one DataStructure
}

interface Copy extends Element {

}

interface Category {

}

interface Transition {

}

interface ApiMetadata {
  meta: {
    classes: {
      content: StringElement[];
    }
  };
}
