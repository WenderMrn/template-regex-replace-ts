import { MapTransformation, CustomTypesTransformations } from './types';
declare class Template {
    private mapTransformation;
    constructor();
    private replaceText;
    /**
     * Return the names available transformations.
     * @returns string[]
     */
    getTransformationsName(): string[];
    /**
     * Select one or more transformations to use on atob or btoa methods
     * @returns new template instance
     */
    pickTransformation<T extends CustomTypesTransformations<string> = CustomTypesTransformations<string>>(...names: T[]): Template;
    /**
     * Omit one or more transformations you don't use on atob or btoa methods
     * @returns new template instance
     */
    omitTransformation<T extends CustomTypesTransformations<string> = CustomTypesTransformations<string>>(...names: T[]): Template;
    /**
     * Receives a original text with marks and apply transformations.
     * @param text
     * @returns transformedText
     */
    atob(text: string | undefined): string | undefined;
    /**
     * Receives a transformed text and revert transformations on text.
     * @param transformedText
     * @returns text
     */
    btoa(transformedText: string | undefined): string | undefined;
    /**
     * Add a new rule transformation to the default transformations existing.
     * @param transformations
     * @returns
     */
    addTransform<T extends MapTransformation[]>(...transformations: T): Template;
    /**
     * Replace all transformations default by the transformations passed by.
     * @param transformations
     * @returns
     */
    replaceTransformations<T extends MapTransformation>(transformations: T): Template;
    /**
     * Clears all transformations and return a Template instance
     * @returns Template instance
     */
    clearTransformations(): Template;
    /**
     * Reset transformation to default values
     * @returns Template instance
     * @deprecated Please use resetTransformations
     */
    resetTransformation(): Template;
    /**
     * Reset transformations to default values
     * @returns Template instance
     */
    resetTransformations(): Template;
}
export default Template;
