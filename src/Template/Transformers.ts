import { Transformer, RecordTransformer } from "./types";

const bold: Transformer = {
  atob: {
    from: /\*\*(.+)\*\*/g,
    to: "<b>$1</b>"
  },
  btoa: {
    from: /<b>(.+)<\/b>/g,
    to: "**$1**"
  }
};

const newLine: Transformer = {
  atob: {
    from: /\n/g,
    to: "<br/>"
  },
  btoa: {
    from: /(<br \/>|<br\/>|<br>)/g,
    to: "\n"
  }
};

const tab: Transformer = {
  atob: {
    from: /\t/g,
    to: "&#9;"
  },
  btoa: {
    from: /"&#9;/g,
    to: "\t"
  }
};

const italic: Transformer = {
  atob: {
    from: /~~(.+)~~/g,
    to: "<i>$1</i>"
  },
  btoa: {
    from: /<i>(.+)<\/i>/g,
    to: "~~$1~~"
  }
};

const link: Transformer = {
  atob: {
    from: /\[(.+)\]\((.+)\)/g,
    to: '<a href="$2">$1</a>'
  },
  btoa: {
    from: /<a href="(.+)">(.+)<\/a>/g,
    to: "/[$2]/($1)/g"
  }
};

const transformers: RecordTransformer = {
  bold,
  newLine,
  tab,
  italic,
  link
};

export default transformers;
