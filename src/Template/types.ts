export interface Rule {
  from: RegExp | string;
  to: RegExp | string;
}

export type TypesTransformation = "bold" | "newLine" | "tab" | string;

export interface Transformation {
  atob: Rule;
  btoa: Rule;
}

export type RecordTransformation = Record<TypesTransformation, Transformation>;
