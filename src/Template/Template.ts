import { Transformation, RecordTransformation } from "./types";
import Transformers from "./Transformers";

class Template {
  private transformationOptions: RecordTransformation = Transformers;

  private replaceText(text: string, type: "atob" | "btoa") {
    let output = text;
    const keys = Object.keys(this.transformationOptions);

    keys.forEach((name) => {
      const t: Transformation = this.transformationOptions[name];
      const operation = type === "atob" ? t.atob : t.btoa;
      output = output.replace(operation.from, operation.to as string);
    });

    return output;
  }

  public atob(text: string) {
    return this.replaceText(text, "atob");
  }

  public btoa(text: string) {
    return this.replaceText(text, "btoa");
  }

  public addTransform(records: RecordTransformation) {
    this.transformationOptions = Object.assign(
      this.transformationOptions,
      records
    );
    return this;
  }

  public replaceTransformations(records: RecordTransformation) {
    this.transformationOptions = records;
    return this;
  }

  public emptyTransformations() {
    this.transformationOptions = {};
    return this;
  }
}

export default Template;
