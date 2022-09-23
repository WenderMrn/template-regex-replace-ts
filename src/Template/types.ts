type RuleItem = RegExp | string;

export type TypesTransformations =
  | 'bold'
  | 'newLine'
  | 'tab'
  | 'italic'
  | 'link'
  | 'underline'
  | 'style'
  | 'deleted'
  | 'subscript'
  | 'superscript'
  | 'horizontalRule'
  | 'titles'
  | string;

export interface Rule {
  from?: RuleItem;
  to?: string;
  replace?: (text: string) => string;
}

export enum TypeOperation {
  Atob,
  Btoa,
}

export interface Transformation {
  atob: Rule;
  btoa: Rule;
}

export interface SimpleTagOption {
  tagName: string;
  symbol: string;
  markdown: string;
}

export type MapTransformation = Record<TypesTransformations, Transformation>;
