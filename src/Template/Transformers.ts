import { Transformation, SimpleTagOption, MapTransformation, TemplateTransformations } from './types';

function simpleTagTransformation({ tagName, symbol, markdown }: SimpleTagOption): Transformation {
  return {
    atob: {
      from: RegExp(`${symbol}${markdown}${symbol}([\\s\\S]*?)${symbol}${markdown}${symbol}`, 'g'),
      to: `<${tagName}>$1</${tagName}>`,
    },
    btoa: {
      from: RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, 'g'),
      to: `${symbol}${markdown}${symbol}$1${symbol}${markdown}${symbol}`,
    },
  };
}

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

const link: Transformation = {
  atob: {
    replace: (text: string) => {
      let output = text;
      const regex = /(?<!#)\[([\s\S]*?)\]\(([\s\S]*?)\)(?:{(?<={)([\s\S]*?)(?=})})?/;

      if (!regex.test(output)) return output;

      do {
        const matchs = regex.exec(output) || [];

        if (matchs[3]) {
          const attrsStr = `{${matchs[3]}}`;

          try {
            const obj = JSON.parse(attrsStr);
            const attrs = Object.keys(obj)
              .map((name) => `${name}="${obj[name]}"`)
              .join(' ');

            if (attrs) {
              output = output.replace(regex, `<a href="$2" ${attrs}>$1</a>`);
              continue;
            }
          } catch (e) {
            console.error(e);
          }
        }

        output = output.replace(regex, `<a href="$2">$1</a>`);
      } while (regex.test(output));

      return output;
    },
  },
  btoa: {
    replace: (text: string) => {
      let output = text;
      const regex = /<a([\s\S]*?)>([\s\S]*?)<\/a>/;
      const regexAttr = /(\w+)=["']?((?:.(?!["']?\s(?:\S+)=|\s*?[>"']))+.)["']?/;

      if (!regex.test(output)) return output;

      do {
        const matchs = regex.exec(output) || [];
        let attrToProcess = matchs[1] || '';
        const mapAttributes: { [name: string]: string } = {};

        while (regexAttr.test(attrToProcess)) {
          const m = regexAttr.exec(attrToProcess) || [];
          mapAttributes[m[1]] = m[2];
          attrToProcess = attrToProcess.replace(regexAttr, '');
        }

        const { href, ...others } = mapAttributes;
        const formattedAttributes = Object.entries(others).map(([key, value]) => `"${key}": "${value}"`);

        output = output.replace(
          regex,
          `[$2](${href})${formattedAttributes.length ? `{${formattedAttributes.join(', ')}}` : ''}`,
        );
      } while (regex.test(output));

      return output;
    },
  },
};

const image: Transformation = {
  atob: {
    replace: (text: string) => {
      let output = text;
      const regex = /#\[([\s\S]*?)\]\((\S*)\)(?:{(?<={)([\s\S]*?)(?=})})?/;

      if (!regex.test(output)) return output;

      do {
        const matchs = regex.exec(output) || [];

        if (matchs[3]) {
          const attrsStr = `{${matchs[3]}}`;

          try {
            const obj = JSON.parse(attrsStr);
            const attrs = Object.keys(obj)
              .map((name) => `${name}="${obj[name]}"`)
              .join(' ');

            if (attrs) {
              output = output.replace(regex, `<img src="$2" alt="$1" ${attrs} />`);
              continue;
            }
          } catch (e) {
            console.error(e);
          }
        }

        output = output.replace(regex, `<img src="$2" alt="$1" />`);
      } while (regex.test(output));

      return output;
    },
  },
  btoa: {
    replace: (text: string) => {
      let output = text;

      const regex = /<img([\s\S]*?)\/>/;
      const regexAttr = /(\w+)=["']?((?:.(?!["']?\s(?:\S+)=|\s*?[>"']))+.)["']?/;

      if (!regex.test(output)) return output;

      do {
        const matchs = regex.exec(output) || [];
        let attrToProcess = matchs[1] || '';
        const mapAttributes: { [name: string]: string } = {};

        while (regexAttr.test(attrToProcess)) {
          const m = regexAttr.exec(attrToProcess) || [];
          mapAttributes[m[1]] = m[2];
          attrToProcess = attrToProcess.replace(regexAttr, '');
        }

        const { src, alt, ...others } = mapAttributes;
        const formattedAttributes = Object.entries(others).map(([key, value]) => `"${key}": "${value}"`);

        output = output.replace(
          regex,
          `#[${alt}](${src})${formattedAttributes.length ? `{${formattedAttributes.join(', ')}}` : ''}`,
        );
      } while (regex.test(output));

      return output;
    },
  },
};

const underline: Transformation = {
  atob: {
    from: /___\*([\s\S]*?)\*___/g,
    to: '<u>$1</u>',
  },
  btoa: {
    from: /<u>([\s\S]*?)<\/u>/g,
    to: '___*$1*___',
  },
};

const style: Transformation = {
  atob: {
    from: /~style=\[([\s\S]*?)\]~([\s\S]*?)~style~/g,
    to: '<span style="$1">$2</span>',
  },
  btoa: {
    from: /<span style="([\s\S]*?)">([\s\S]*?)<\/span>/g,
    to: '~style=[$1]~$2~style~',
  },
};

const horizontalRule: Transformation = {
  atob: {
    from: /(\*\*\*)|(---)/g,
    to: '<hr/>',
  },
  btoa: {
    from: /<hr\/>/g,
    to: '---',
  },
};

const titles: Transformation = {
  atob: {
    from: /t[1-6]{(?<=t(\d){)([\s\S]*?)(?=})}/g,
    to: '<h$1>$2</h$1>',
  },
  btoa: {
    from: /<h[1-6]>(?<=<h([1-6])>)([\s\S]*?)(?=<\/h[1-6]>)<\/h[1-6]>/g,
    to: 't$1{$2}',
  },
};

const abbrev: Transformation = {
  atob: {
    from: /~abbr=\[([\s\S]*?)\]~([\s\S]*?)~abbr~/g,
    to: '<abbr title="$1">$2</abbr>',
  },
  btoa: {
    from: /<abbr title="([\s\S]*?)">([\s\S]*?)<\/abbr>/g,
    to: '~abbr=[$1]~$2~abbr~',
  },
};

const paragraph: Transformation = {
  atob: {
    from: /p{(?<=p{)([\s\S]*?)(?=})}/g,
    to: '<p>$1</p>',
  },
  btoa: {
    from: /<p>(?<=<p>)([\s\S]*?)(?=<\/p>)<\/p>/g,
    to: 'p{$1}',
  },
};

const lists: Transformation = {
  atob: {
    replace: (text: string) => {
      let output = text;
      const regex = /([u|o]l)\[(?<=[u|o]l\[)([\s\S]*?)(?=\])\]/;

      if (!regex.test(output)) return output;

      do {
        const matchs = regex.exec(output) || [];
        const items = matchs[2]?.trim().split('||') || [];
        output = output.replace(regex, `<$1>${items.map((item) => `<li>${item}</li>`).join('')}</$1>`);
      } while (regex.test(output));

      return output;
    },
  },
  btoa: {
    replace: (text: string) => {
      let output = text;
      const regex = /<([u|o]l)>(<li>[\s\S]*?<\/li>)<\/[u|o]l>/;

      if (!regex.test(output)) return output;

      do {
        const matchs = regex.exec(output) || [];
        const items =
          matchs[2]
            ?.split(/<li>([\s\S]*?)<\/li>/g)
            ?.filter((i) => i)
            .join('||') || '';

        output = output.replace(regex, `$1[${items}]`);
      } while (regex.test(output));

      return output;
    },
  },
};

// Simple tags
const deleted = simpleTagTransformation({ tagName: 'del', markdown: 'del', symbol: '~' });
const subscript = simpleTagTransformation({ tagName: 'sub', markdown: 'sub', symbol: '~' });
const superscript = simpleTagTransformation({ tagName: 'sup', markdown: 'sup', symbol: '~' });
const small = simpleTagTransformation({ tagName: 'small', markdown: 'sm', symbol: '~' });

const transformations: MapTransformation<TemplateTransformations> = {
  bold,
  newLine,
  tab,
  italic,
  link,
  underline,
  style,
  deleted,
  subscript,
  superscript,
  horizontalRule,
  titles,
  abbrev,
  paragraph,
  lists,
  image,
  small
};

export default transformations;
