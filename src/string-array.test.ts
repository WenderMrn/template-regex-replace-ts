import "reflect-metadata";
import {
  Discriminator,
  plainToClass,
  Transform,
  Type
} from "class-transformer";

class ArrayHolder {
  @Type(() => String)
  array?: string[];

  constructor(array: string[]) {
    this.array = array;
  }
}

test("asd", () => {
  const plain = { array: undefined };
  const deserialized = plainToClass(ArrayHolder, plain);

  expect(deserialized.array).toBeUndefined();
});
