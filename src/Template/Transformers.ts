import { Transformation, SimpleTagOption, MapTransformation } from './types';

function simpleTagTransformation({ tagName, symbol, markdown }: SimpleTagOption): Transformation {
  return {
    atob: {
      from: RegExp(`${symbol}${markdown}${symbol}(.+)${symbol}${markdown}${symbol}`, 'g'),
      to: `<${tagName}>$1</${tagName}>`,
    },
    btoa: {
      from: RegExp(`<${tagName}>(.+)</${tagName}>`, 'g'),
      to: `${symbol}${markdown}${symbol}$1${symbol}${markdown}${symbol}`,
    },
  };
}

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
    replace: (text: string) => {
      const regex = /\[(.+)\]\((.+)\)(?:\{(.+)\})?/g;
      const matchs = regex.exec(text) || [];

      if (matchs[3]) {
        const attrsStr = `{${matchs[3]}}`;
        try {
          const obj = JSON.parse(attrsStr);
          const attrs = Object.keys(obj)
            .map((name) => `${name}="${obj[name]}"`)
            .join(' ');

          return text.replace(regex, `<a href="$2" ${attrs}>$1</a>`);
        } catch (e) {
          console.error(e);
        }
      }

      return text.replace(regex, `<a href="$2">$1</a>`);
    },
  },
  btoa: {
    replace: (text: string) => {
      const regex = /<a(.+)>(.+)<\/a>/g;
      const matchs = regex.exec(text) || [];

      const listAttrs = matchs[1]?.trim()?.split(' ') || [];
      const href = listAttrs.find((a) => a.includes('href'))?.replace(/(href=)|[|"|']/g, '') || '';

      const attrs = listAttrs
        .filter((a) => !a.includes('href'))
        .map((item) => {
          return item
            .split('=')
            .map((a) => (!/['|"]/g.test(a) ? `"${a}"` : a))
            .join(': ');
        })
        .join(', ');

      if (attrs) {
        return text.replace(regex, `[$2](${href}){${attrs}}`);
      }

      return text.replace(regex, `[$2](${href})`);
    },
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

const style: Transformation = {
  atob: {
    from: /~style=\[(.+)\]~(.+)~style~/g,
    to: '<span style="$1">$2</span>',
  },
  btoa: {
    from: /<span style="(.+)">(.+)<\/span>/g,
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
    from: /(?<=<h(\d)>)(\S*)(?=<\/h\d>)/g,
    to: 't$1{$2}',
  },
};

const abrev: Transformation = {
  atob: {
    from: /~abbr=\[(.+)\]~(.+)~abbr~/g,
    to: '<abbr title="$1">$2</abbr>'
  },
  btoa: {
    from: /<abbr title="(.+)">(.+)<\/abbr>/g,
    to: '~abbr=[$1]~$2~abbr~',
  },
}


// Simple tags
const deleted = simpleTagTransformation({ tagName: 'del', markdown: 'del', symbol: '~' });
const subscript = simpleTagTransformation({ tagName: 'sub', markdown: 'sub', symbol: '~' });
const superscript = simpleTagTransformation({ tagName: 'sup', markdown: 'sup', symbol: '~' });

const transformations: MapTransformation = {
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
  abrev
};

export default transformations;
