type RuleItem = RegExp | string;

export const ALL_TEMPLATE_TRANSFORMATIONS = [
  'bold',
  'newLine',
  'tab',
  'italic',
  'link',
  'underline',
  'style',
  'deleted',
  'subscript',
  'superscript',
  'horizontalRule',
  'titles',
  'abbrev',
  'paragraph',
  'lists',
  'image',
  'small'
] as const;

export type TemplateTransformations = typeof ALL_TEMPLATE_TRANSFORMATIONS[number];

export type CustomTypesTransformations<T> = TemplateTransformations | T;
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

export type MapTransformation<T extends CustomTypesTransformations<string> = CustomTypesTransformations<string>> =
  Record<T, Transformation>;
