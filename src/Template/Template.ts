import { Transformer, RecordTransformer } from "./types";
import Transformers from "./Transformers";

class Template {
  private formaterOptions: RecordTransformer = Transformers;

  private replaceText(text: string, type: "atob" | "btoa") {
    let output = text;
    const keys = Object.keys(this.formaterOptions);

    keys.forEach((name) => {
      const t: Transformer = this.formaterOptions[name];
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

  public addTransform(records: RecordTransformer) {
    this.formaterOptions = Object.assign(this.formaterOptions, records);
    return this;
  }

  public replaceTransformations(records: RecordTransformer) {
    this.formaterOptions = records;
    return this;
  }

  public emptyTransformations() {
    this.formaterOptions = {};
    return this;
  }
}

export default Template;
