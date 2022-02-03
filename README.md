# Template Regex Replace

This projete is a simple scheme to replace strings part as like a markdown work.
For example: You can use it to create a textarea element in your form and after render a elements with html formatting and etc.

### Requirements

- Typescript >= 4.5.5

### Features

methods

```ts
const tpl = new Template(); // instance template class

tpl.atob(text); // turns markdown into HTML tags according to the rules
tpl.btoa(text); // turns HTML tags into markdown according to the rules
tpl.replaceTransformations(transformation); // replace all transformation
tpl.addTransform(transformation); // add new transformation rule into existing rules
tpl.clearTransformations(); // clear all transformations rules from the instance
```

default rules

```ts
const bold: Transformation = {
  atob: {
    from: /\*\*(.+)\*\*/g,
    to: "<b>$1</b>",
  },
  btoa: {
    from: /<b>(.+)<\/b>/g,
    to: "**$1**",
  },
};

const newLine: Transformation = {
  atob: {
    from: /\n/g,
    to: "<br/>",
  },
  btoa: {
    from: /(<br \/>|<br\/>|<br>)/g,
    to: "\n",
  },
};

const tab: Transformation = {
  atob: {
    from: /\t/g,
    to: "&#9;",
  },
  btoa: {
    from: /"&#9;/g,
    to: "\t",
  },
};

const italic: Transformation = {
  atob: {
    from: /~~(.+)~~/g,
    to: "<i>$1</i>",
  },
  btoa: {
    from: /<i>(.+)<\/i>/g,
    to: "~~$1~~",
  },
};

const link: Transformation = {
  atob: {
    from: /\[(.+)\]\((.+)\)/g,
    to: '<a href="$2">$1</a>',
  },
  btoa: {
    from: /<a href="(.+)">(.+)<\/a>/g,
    to: "/[$2]/($1)/g",
  },
};

const underline: Transformation = {
  atob: {
    from: /___\*(.+)\*___/g,
    to: "<u>$1</u>",
  },
  btoa: {
    from: /<u>(.+)<\/u>/g,
    to: "___*$1*___",
  },
};
```

### Usage

**Text base example:** Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

1. Default transformation

```ts
import Template from "./Template";

const tpl = new Template();

const text = `**Lorem** Ipsum is simply dummy text of the [printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const textOutput = tpl.atob(text);

/*
//text textOutput

<b>Lorem</b> Ipsum is simply dummy text of the <a href=\"https://en.wikipedia.org/wiki/Printing_press\">printing</a> and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type <i>specimen book</i>.<br/>&#9; It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
 */
```

2. Default + custom transformation

```ts
import Template from "./Template";

// custom + default transformations
const tpl = new Template().addTransform({
  underline: {
    atob: {
      from: /___\*(.+)\*___/g,
      to: "<u>$1</u>",
    },
    btoa: {
      from: /<u>(.+)<\/u>/g,
      to: "___*$1*___",
    },
  },
  uppercase: {
    atob: {
      from: /~up~(.+)~up~/g,
      to: `<span class="text-uppercase">$1</span>`,
    },
    btoa: {
      from: /<span class="text-uppercase">(.+)<\/span>/g,
      to: "~up~$1~up~",
    },
  },
});

const text = `**Lorem** Ipsum is simply ~up~dummy~up~ text of the [printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting ___*industry*___. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const textOutput = tpl.atob(text);

/*
//text textOutput

<b>Lorem</b> Ipsum is simply <span class=\"text-uppercase\">dummy</span> text of the <a href=\"https://en.wikipedia.org/wiki/Printing_press\">printing</a> and typesetting <u>industry</u>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type <i>specimen book</i>.<br/>&#9; It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
 */
```

3. Replace all transformations and set your own

```ts
import Template from "./Template";

// replace transformations
const tpl = new Template().replaceTransformations({
  uppercase: {
    atob: {
      from: /~sm~(.+)~sm~/g,
      to: `<small>$1</small>`,
    },
    btoa: {
      from: /<span class="text-uppercase">(.+)<\/span>/g,
      to: "~sm~$1~sm~",
    },
  },
});

const text = `**Lorem** Ipsum is simply ~up~dummy~up~ text of the [printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting ___*industry*___. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ~sm~unknown printer~sm~ took a galley of type and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const textOutput = tpl.atob(text);

/*
//text textOutput

**Lorem** Ipsum is simply ~up~dummy~up~ text of the [printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting ___*industry*___. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an <small>unknown printer</small> took a galley of type and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
 */
```

```
Note that a unique format that worked this time was ~sm~unknown printer~sm~ which became <small>unknown printer</small>.
```
