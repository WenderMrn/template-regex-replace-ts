type RuleItem = RegExp | string;

export interface Rule {
  from?: RuleItem;
  to?: RuleItem;
  replace?: ((text: string) => string)
}

export type TypesTransformation = "bold" | "newLine" | "tab" | string;

export enum TypeOperation {
  Atob,
  Btoa
}

export interface Transformation {
  atob: Rule;
  btoa: Rule;
}

export type RecordTransformation = Record<TypesTransformation, Transformation>;
