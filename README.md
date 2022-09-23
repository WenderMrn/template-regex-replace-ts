# Template Regex Replace

This projete is a simple scheme to replace strings part as like a markdown work.
For example: You can use it to create a textarea element in your form and after render a elements with html formatting and etc.

### Requirements

- Typescript >= 4.5.5

### Demo Applications

- <a href="https://codesandbox.io/s/react-template-replace-ts-demo-b97u4t" target="_blank">React</a>
- <a href="https://codesandbox.io/s/angular-template-replace-ts-demo-xc27rf" target="_blank">Angular</a>

### Features

### Defaut Transformations Examples

<html>
  <table>
  <tr>
    <th>Name</th>
    <th>From</th>
    <th>To</th>
    <th>Element</th>
  </tr>
  <tr>
    <td>Breakline</td>
    <td>\n</td>
    <td>&ltbr/></td>
    <td><br/></td>
  </tr>
   <tr>
    <td>Abreviation</td> 
    <td>~abbr=[United States of America]~USA~abbr~</td>
    <td>&ltabbr title="United States of America">USA&lt/abbr></td> 
    <td><abbr title="United States of America">USA</abbr></td>
  </tr>
  <tr>
    <td>Simple link</td> 
    <td>[Simple link](https://www.lipsum.com/)</td> 
    <td>&lta href="https://www.lipsum.com/">Simple link&lt/a></td>
    <td><a href="https://www.lipsum.com/">Simple link</a></td>
  </tr>
  <tr>
    <td>Link New Page</td> 
    <td>[Link New Page](https://www.lipsum.com/){"target": "_blank"}</td> 
    <td>&lta href="https://www.lipsum.com/" target="_blank">Link New Page&lt/a></td>
    <td><a href="https://www.lipsum.com/" target="_blank">Link New Page</a></td>
  </tr>
   <tr>
    <td>Another Link attributes</td> 
    <td>[Another Link](https://www.lipsum.com/){"target": "_blank", "class": "default-link", id: "link-lorem"}</td> 
    <td>
      &lta href="https://www.lipsum.com/" target="_blank" class="default-link" id="link-lorem">Another Link&lt/a>
    </td>
    <td>
      <a href="https://www.lipsum.com/" target="_blank" class="default-link" id="link-lorem">Another Link</a>
    </td>
  </tr>
  <tr>
    <td>Styled Text</td> 
    <td>~style=[color: red; font-weight: bold]~Styled Text~style~</td> 
    <td>&ltspan style="color: red; font-weight: bold">Styled Text&lt/span></td>
     <td><span style="color: red; font-weight: bold">Styled Text</span></td>
  </tr>
  <tr>
    <td>Striped Text</td> 
    <td>~del~Striped Text~del~</td> 
    <td>&ltdel>Striped Text&lt/del></td>
    <td><del>Striped Text</del></td>
  </tr>
  <tr>
    <td>Subscript text</td> 
    <td>~sub~Subscript text~sub~</td> 
    <td>&ltsub>Subscript text&lt/sub></td>
    <td><sub>Subscript text</sub></td>
  </tr>
  <tr>
    <td>Superscript text</td> 
    <td>~sup~Superscript text~sup~</td> 
    <td>&ltsup>Superscript text&lt/sup></td>
    <td><sup>Superscript text</sup></td>
  </tr>
  <tr>
    <td>Horintal rule</td> 
    <td>--- or ***</td> 
    <td>&lthr/></td>
    <td><hr/></td>
  </tr>
  <tr>
    <td>Titles</td> 
    <td>t1{Title One} t2{Title Two} ... t6{Title Six}</td> 
    <td>&lth1>Title One&lt/h1> &lth2>Title Two&lt/h2> ... &lth6>Title Six&lt/h6></td>
    <td><h1>Title One</h1><h4>Title For</h4><h6>Title Six</h6></td>
  </tr>
</table>
</html>

methods

```ts
import Template from '@wendermrn/template-replace-ts';

const tpl = new Template(); // instance template class

tpl.atob(text); // turns markdown into HTML tags according to the rules
tpl.btoa(text); // turns HTML tags into markdown according to the rules
tpl.replaceTransformations(transformation); // replace all transformation
tpl.addTransform(transformation); // add new transformation rule into existing rules
tpl.clearTransformations(); // clear all transformations rules from the instance
tpl.pickTransformation('bold', ...); // select on or more transformation to apply on atob or btoa
tpl.resetTransformation() // reset transformations to default values
```

default rules

```ts
const bold: Transformation = {
  atob: {
    from: /\*\*(.+)\*\*/g,
    to: '<b>$1</b>',
  },
  btoa: {
    from: /<b>(.+)<\/b>/g,
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
    from: /~~(.+)~~/g,
    to: '<i>$1</i>',
  },
  btoa: {
    from: /<i>(.+)<\/i>/g,
    to: '~~$1~~',
  },
};

const link: Transformation = {
  atob: {
    from: /\[(.+)\]\((.+)\)/g,
    to: '<a href="$2">$1</a>',
  },
  btoa: {
    from: /<a href="(.+)">(.+)<\/a>/g,
    to: '/[$2]/($1)/g',
  },
};

const underline: Transformation = {
  atob: {
    from: /___\*(.+)\*___/g,
    to: '<u>$1</u>',
  },
  btoa: {
    from: /<u>(.+)<\/u>/g,
    to: '___*$1*___',
  },
};
```

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
      from: /___\*(.+)\*___/g,
      to: '<u>$1</u>',
    },
    btoa: {
      from: /<u>(.+)<\/u>/g,
      to: '___*$1*___',
    },
  },
  uppercase: {
    atob: {
      from: /~up~(.+)~up~/g,
      to: `<span class="text-uppercase">$1</span>`,
    },
    btoa: {
      from: /<span class="text-uppercase">(.+)<\/span>/g,
      to: '~up~$1~up~',
    },
  },
  // custom replace function
  abrev: {
    atob: {
      replace: (text: string) => text.replace(/~abbr=\[(.+)\]~(.+)~abbr~/g, `<abbr title="$1">$2</abbr>`),
    },
    btoa: {
      from: /<abbr title\="(.+)">(.+)<\/abbr>/g,
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
  uppercase: {
    atob: {
      from: /~sm~(.+)~sm~/g,
      to: `<small>$1</small>`,
    },
    btoa: {
      from: /<span class="text-uppercase">(.+)<\/span>/g,
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
