# Template Regex Replace

[![NPM](https://nodei.co/npm/@wendermrn/template-replace-ts.png?mini=true)](https://npmjs.org/package/@wendermrn/template-replace-ts)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-96.34%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-93.33%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-95%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-97.5%25-brightgreen.svg?style=flat) |

This project is a simple scheme to replace strings part as like a markdown work.
For example: You can use it to create a textarea element in your form and after render a elements with html formatting and etc.

### Demo Applications

- <a href="https://codesandbox.io/s/react-template-replace-ts-demo-b97u4t" target="_blank">React</a>
- <a href="https://codesandbox.io/s/angular-template-replace-ts-demo-xc27rf" target="_blank">Angular</a>

### Features

methods

```ts
import Template, { TemplateTransformations } from '@wendermrn/template-replace-ts';

const tpl = new Template(); // instance template class

tpl.atob(text); // turns markdown into HTML tags according to the rules
tpl.btoa(text); // turns HTML tags into markdown according to the rules
tpl.replaceTransformations(transformation); // replace all transformation
tpl.addTransform(transformation); // add new transformation rule into existing rules
tpl.clearTransformations(); // clear all transformations rules from the instance
tpl.resetTransformations() // reset transformations to default values

tpl.pickTransformation('bold', ...); // select one or more transformation to apply on atob or btoa
tpl.pickTransformation<TemplateTransformations>('bold', ...); // Same as tpl.pickTransformation(...) but checks types picked (TS)
tpl.pickTransformation<TemplateTransformations | 'custom'>('custom', ...); // Same as tpl.pickTransformation<...>(...) but checks types picked and accept others custom types (TS)

tpl.omitTransformation("italic", ...) // Omit one or more transformations you don't want use on atob or btoa methods
tpl.omitTransformation<TemplateTransformations>("italic", ...) //Same tpl.omitTransformation(...) but checks types omitted (TS)
tpl.omitTransformation<TemplateTransformations | 'custom'>("custom", ...) // Same tpl.omitTransformation<...>(...) but checks types omitted and accept others custom types (TS)
```

example default rules

```ts
const bold: Transformation = {
  atob: {
    from: /\*\*([\s\S]*?)\*\*/g,
    to: '<b>$1</b>',
  },
  btoa: {
    from: /<b>([\s\S]*?)<\/b>/g,
    to: '**$1**',
  },
};

const newLine: Transformation = {
  atob: {
    from: /\n/g,
    to: '<br/>',
  },
  btoa: {
    from: /(<br \/>|<br\/>|<br>)/g,
    to: '\n',
  },
};

const tab: Transformation = {
  atob: {
    from: /\t/g,
    to: '&#9;',
  },
  btoa: {
    from: /"&#9;/g,
    to: '\t',
  },
};

const italic: Transformation = {
  atob: {
    from: /~~([\s\S]*?)~~/g,
    to: '<i>$1</i>',
  },
  btoa: {
    from: /<i>([\s\S]*?)<\/i>/g,
    to: '~~$1~~',
  },
};
```

### Default Transformations Examples

```
transformations: [
  'bold' , 'newLine', 'tab', 'italic', 'link', 'underline',
  'style', 'deleted', 'subscript', 'superscript','horizontalRule',
  'titles', 'abbrev', 'paragraph', 'lists'
]
```

<html>
  <table>
  <tr>
    <th>Name</th>
    <th>From</th>
    <th>To</th>
  </tr>
  <tr>
    <td>newLine</td>
    <td>\n</td>
    <td><br/></td>
  </tr>
   <tr>
    <td>abbrev</td> 
    <td>~abbr=[United States of America]~USA~abbr~</td>
    <td><abbr title="United States of America">USA</abbr></td>
  </tr>
  <tr>
    <td>link (Simple link)</td> 
    <td>[Simple link](https://www.lipsum.com/)</td> 
    <td><a href="https://www.lipsum.com/">Simple link</a></td>
  </tr>
  <tr>
    <td>link (Link New Page)</td> 
    <td>[Link New Page](https://www.lipsum.com/){"target": "_blank"}</td> 
    <td><a href="https://www.lipsum.com/" target="_blank">Link New Page</a></td>
  </tr>
   <tr>
    <td>link (Another attributes)</td> 
    <td>[Another Link](https://www.lipsum.com/){"target": "_blank", "class": "default-link", id: "link-lorem"}</td> 
    <td>
      <a href="https://www.lipsum.com/" target="_blank" class="default-link" id="link-lorem">Another Link</a>
    </td>
  </tr>
  <tr>
    <td>style</td> 
    <td>~style=[color: red; font-weight: bold]~Styled Text~style~</td> 
     <td><span style="color: red; font-weight: bold">Styled Text</span></td>
  </tr>
  <tr>
    <td>deleted</td> 
    <td>~del~Striped Text~del~</td> 
    <td><del>Striped Text</del></td>
  </tr>
  <tr>
    <td>subscript</td> 
    <td>~sub~Subscript text~sub~</td> 
    <td><sub>Subscript text</sub></td>
  </tr>
  <tr>
    <td>superscript</td> 
    <td>~sup~Superscript text~sup~</td> 
    <td><sup>Superscript text</sup></td>
  </tr>
  <tr>
    <td>horizontalRule</td> 
    <td>--- or ***</td> 
    <td><hr/></td>
  </tr>
  <tr>
    <td>titles</td> 
    <td>t1{Title One} t2{Title Two} ... t6{Title Six}</td> 
    <td><h1>Title One</h1><h4>Title Two</h4><h6>Title Six</h6></td>
  </tr>
  <tr>
    <td>paragraph</td> 
    <td>p{Paragraph One} p{Paragraph Two} ... p{Paragraph Six}</td> 
    <td><p>Paragraph One</p><p>Paragraph Two</p> ... <p>Paragraph Six</p></td>
  </tr>
  <tr>
    <td>lists (ordered)</td> 
    <td>ol[Item One||Item Two||Item Six]</td> 
    <td><ol><li>Item One</li><li>Item Two</li><li>Item Six</li></ol></td>
  </tr>
   <tr>
    <td>lists (unordered)</td> 
    <td>ul[Item One||Item Two||Item Six]</td> 
    <td><ul><li>Item One</li><li>Item Two</li><li>Item Six</li></ul></td>
  </tr>
</table>
</html>

### Usage

#### Install

```bash
npm i @wendermrn/template-replace-ts
```

**Text base example:** Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

1. Default transformation

```ts
import Template from '@wendermrn/template-replace-ts';

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
import Template from '@wendermrn/template-replace-ts';

// custom + default transformations
const tpl = new Template().addTransform({
  underline: {
    atob: {
      from: /___\*([\s\S]*?])\*___/g,
      to: '<u>$1</u>',
    },
    btoa: {
      from: /<u>([\s\S]*?])<\/u>/g,
      to: '___*$1*___',
    },
  },
  uppercase: {
    atob: {
      from: /~up~([\s\S]*?])~up~/g,
      to: `<span class="text-uppercase">$1</span>`,
    },
    btoa: {
      from: /<span class="text-uppercase">([\s\S]*?])<\/span>/g,
      to: '~up~$1~up~',
    },
  },
  // custom replace function
  abbrev: {
    atob: {
      replace: (text: string) => text.replace(/~abbr=\[([\s\S]*?])\]~([\s\S]*?)~abbr~/g, `<abbr title="$1">$2</abbr>`),
    },
    btoa: {
      from: /<abbr title\="([\s\S]*?)">([\s\S]*?)<\/abbr>/g,
      to: '~abbr=[$2]~$1~abbr~',
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
import Template from '@wendermrn/template-replace-ts';

// replace transformations
const tpl = new Template().replaceTransformations({
  lowercase: {
    atob: {
      from: /~sm~([\s\S]*?)~sm~/g,
      to: `<small>$1</small>`,
    },
    btoa: {
      from: /<span class="text-lowercase">([\s\S]*?)<\/span>/g,
      to: '~sm~$1~sm~',
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
