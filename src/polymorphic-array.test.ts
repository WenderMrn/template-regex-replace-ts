import "reflect-metadata";
import {
  Discriminator,
  plainToClass,
  Transform,
  Type
} from "class-transformer";

enum MessageType {
  Text = "TEXT",
  Image = "IMAGE"
}

class Message {
  public type: MessageType;

  constructor(type: MessageType) {
    this.type = type;
  }
}

class TextMessage extends Message {
  public text: string;

  constructor(text: string) {
    super(MessageType.Text);
    this.text = text;
  }
}

class ImageMessage extends Message {
  public imageUrl: string;

  constructor(imageUrl: string) {
    super(MessageType.Image);
    this.imageUrl = imageUrl;
  }
}

const messageDiscriminator: Discriminator = {
  property: "type",
  subTypes: [
    { name: MessageType.Text, value: TextMessage },
    { name: MessageType.Image, value: ImageMessage }
  ]
};

class MessageArrayHolder {
  @Type(() => Message, {
    discriminator: messageDiscriminator,
    keepDiscriminatorProperty: true
  })
  messages: Message[];

  constructor(messages: Message[]) {
    this.messages = messages;
  }
}

test("should deserialize array of messages in object", () => {
  const plain = {
    messages: [
      { type: MessageType.Text, text: "someText" },
      { type: MessageType.Image, imageUrl: "someUrl" }
    ]
  };

  const deserialized = plainToClass(MessageArrayHolder, plain);

  expect(deserialized.messages).toHaveLength(2);
  expect(deserialized.messages[0]).toBeInstanceOf(TextMessage);
  expect(deserialized.messages[1]).toBeInstanceOf(ImageMessage);
});

test("should deserialize empty array of messages in object", () => {
  const plain = {
    messages: []
  };

  const deserialized = plainToClass(MessageArrayHolder, plain);

  expect(deserialized.messages).toHaveLength(0);
});

test("should deserialize undefined array of messages in object", () => {
  const plain = {
    messages: undefined
  };

  const deserialized = plainToClass(MessageArrayHolder, plain);

  expect(deserialized.messages).toBeUndefined();
});
