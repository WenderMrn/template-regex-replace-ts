import { Transformation, MapTransformation, TypeOperation } from './types';
import Transformers from './Transformers';

class Template {
  private mapTransformation: MapTransformation;

  constructor() {
    this.mapTransformation = Transformers;
  }

  private replaceText(text: string | undefined, type: TypeOperation) {
    if(!text) return text;

    let output = text;
    const keys = Object.keys(this.mapTransformation);

    for (const name of keys) {
      const t: Transformation = this.mapTransformation[name];
      const operation = type === TypeOperation.Atob ? t.atob : t.btoa;

      if (operation.from && operation.to) {
        output = output.replace(operation.from, operation.to);
      }

      if (operation.replace) {
        output = operation.replace(output);
      }
    }

    return output;
  }

  /**
   * Return the names available transformations.
   * @returns string[]
   */
  public getTransformationsName() {
    return Object.keys(this.mapTransformation);
  }

  /**
   * Select one or more transformations to use together atob or btoa methods
   * @returns new template instance
   */
  public pickTransformation(...names: string[]) {
    const transformations: MapTransformation = {};

    for (const name of names) {
      if (this.mapTransformation[name]) {
        transformations[name] = this.mapTransformation[name];
      }
    }

    return new Template().replaceTransformations(transformations);
  }

  /**
   * Receives a original text with marks and apply transformations.
   * @param text
   * @returns transformedText
   */
  public atob(text: string | undefined) {
    return this.replaceText(text, TypeOperation.Atob);
  }

  /**
   * Receives a transformed text and revert transformations on text.
   * @param transformedText
   * @returns text
   */
  public btoa(transformedText: string | undefined) {
    return this.replaceText(transformedText, TypeOperation.Btoa);
  }

  /**
   * Add a new rule transformation to the default transformations existing.
   * @param transformations
   * @returns
   */
  public addTransform(...transformations: MapTransformation[]) {
    this.mapTransformation = Object.assign(this.mapTransformation, ...transformations);
    return this;
  }

  /**
   * Replace all transformations default by the transformations passed by.
   * @param transformations
   * @returns
   */
  public replaceTransformations(transformations: MapTransformation) {
    this.mapTransformation = transformations;
    return this;
  }

  /**
   * Clears all transformations and return a Template instance
   * @returns Template instance
   */
  public clearTransformations() {
    this.mapTransformation = {};
    return this;
  }

  /**
   * Reset transformation to default values
   * @returns Template instance
   */
  public resetTransformation() {
    this.mapTransformation = Transformers;
    return this;
  }
}

export default Template;
