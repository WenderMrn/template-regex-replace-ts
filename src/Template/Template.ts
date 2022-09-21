import { Transformation, RecordTransformation, TypeOperation } from './types';
import Transformers from './Transformers';

class Template {
  private transformationOptions: RecordTransformation;

  constructor() {
    this.transformationOptions = Transformers;
  }

  private replaceText(text: string, type: TypeOperation) {
    let output = text;
    const keys = Object.keys(this.transformationOptions);

    for (const name of keys) {
      const t: Transformation = this.transformationOptions[name];
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
    return Object.keys(this.transformationOptions);
  }

  /**
   * Select one or more transformations to use together atob or btoa methods
   * @returns new template instance
   */
  public pickTransformation(...names: string[]) {
    const transformations: RecordTransformation = {};

    for (const name of names) {
      if (this.transformationOptions[name]) {
        transformations[name] = this.transformationOptions[name];
      }
    }

    return new Template().replaceTransformations(transformations);
  }

  /**
   * Receives a original text with marks and apply transformations.
   * @param text
   * @returns transformedText
   */
  public atob(text: string) {
    return this.replaceText(text, TypeOperation.Atob);
  }

  /**
   * Receives a transformed text and revert transformations on text.
   * @param transformedText
   * @returns text
   */
  public btoa(transformedText: string) {
    return this.replaceText(transformedText, TypeOperation.Btoa);
  }

  /**
   * Add a new rule transformation to the default transformations existing.
   * @param records
   * @returns
   */
  public addTransform(...records: RecordTransformation[]) {
    this.transformationOptions = Object.assign(this.transformationOptions, ...records);
    return this;
  }

  /**
   * Replace all transformations default by the transformations passed by.
   * @param records
   * @returns
   */
  public replaceTransformations(records: RecordTransformation) {
    this.transformationOptions = records;
    return this;
  }

  /**
   * Clears all transformations and return a Template instance
   * @returns Template instance
   */
  public clearTransformations() {
    this.transformationOptions = {};
    return this;
  }

  /**
   * Reset transformation to default values
   * @returns Template instance
   */
  public resetTransformation() {
    this.transformationOptions = Transformers;
    return this;
  }
}

export default Template;
