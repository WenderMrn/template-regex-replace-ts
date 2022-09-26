import Template from '../Template';

const inputText = `
**Lorem** Ipsum is simply ~up~dummy~up~ text of the 
[printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting ___*industry*___. Lorem Ipsum has been
the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
type and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the
leap into electronic typesetting, remaining essentially unchanged. ~abbr=[Estados Unidos da América]~EUA~abbr~
`;

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
  abbrev: {
    atob: {
      replace: (text: string) => text.replace(/~abbr=\[(.+)\]~(.+)~abbr~/g, `<abbr title="$1">$2</abbr>`),
    },
    btoa: {
      from: /<abbr title="(.+)">(.+)<\/abbr>/g,
      to: '~abbr=[$1]~$2~abbr~',
    },
  },
});

console.info('\n\nORIG: ', JSON.stringify(inputText));

const atob = tpl.atob(inputText);
const btoa = tpl.btoa(atob);

console.info('\n\nAtob: ', JSON.stringify(atob));
console.info('\n\nBtoa: ', JSON.stringify(btoa));
