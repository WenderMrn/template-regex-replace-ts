declare type RuleItem = RegExp | string;
export declare const ALL_TEMPLATE_TRANSFORMATIONS: readonly ["bold", "newLine", "tab", "italic", "link", "underline", "style", "deleted", "subscript", "superscript", "horizontalRule", "titles", "abbrev", "paragraph", "lists"];
export declare type TemplateTransformations = typeof ALL_TEMPLATE_TRANSFORMATIONS[number];
export declare type CustomTypesTransformations<T> = TemplateTransformations | T;
export interface Rule {
    from?: RuleItem;
    to?: string;
    replace?: (text: string) => string;
}
export declare enum TypeOperation {
    Atob = 0,
    Btoa = 1
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
export declare type MapTransformation<T extends CustomTypesTransformations<string> = CustomTypesTransformations<string>> = Record<T, Transformation>;
export {};
