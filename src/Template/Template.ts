import { Transformation, RecordTransformation, TypeOperation } from "./types";
import Transformers from "./Transformers";

class Template {
  private transformationOptions: RecordTransformation = Transformers;

  private replaceText(text: string, type: TypeOperation) {
    let output = text;
    const keys = Object.keys(this.transformationOptions);

    keys.forEach((name) => {
      const t: Transformation = this.transformationOptions[name];
      const operation = type === TypeOperation.Atob ? t.atob : t.btoa;

      if(operation.from && operation.to){
        output = output.replace(operation.from, operation.to as string);
      }

      if(operation.replace){
        output = operation.replace(text);
      }
    });

    return output;
  }

  public atob(text: string) {
    return this.replaceText(text, TypeOperation.Atob);
  }

  public btoa(text: string) {
    return this.replaceText(text, TypeOperation.Btoa);
  }

  public addTransform(...records: RecordTransformation[]) {
    this.transformationOptions = Object.assign(
      this.transformationOptions,
      ...records
    );
    return this;
  }

  public replaceTransformations(records: RecordTransformation) {
    this.transformationOptions = records;
    return this;
  }

  public clearTransformations() {
    this.transformationOptions = {};
    return this;
  }
}

export default Template;
