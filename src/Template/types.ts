export interface Rule {
  from: RegExp | string;
  to: RegExp | string;
}

export type TypesTransformer = "bold" | "newLine" | "tab" | string;

export interface Transformer {
  atob: Rule;
  btoa: Rule;
}

export type RecordTransformer = Record<TypesTransformer, Transformer>;
