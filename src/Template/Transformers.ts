import { Transformation, RecordTransformation } from "./types";

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

const transformations: RecordTransformation = {
  bold,
  newLine,
  tab,
  italic,
  link,
};

export default transformations;
