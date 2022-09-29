"use strict";
exports.__esModule = true;
var Template_1 = require("../Template");
var inputText = "\n**Lorem** Ipsum is simply ~up~dummy~up~ text of the \n[printing](https://en.wikipedia.org/wiki/Printing_press) and typesetting ___*industry*___. Lorem Ipsum has been\nthe industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type ~~specimen book~~.\n\t It has survived not only five centuries, but also the\nleap into electronic typesetting, remaining essentially unchanged. ~abbr=[Estados Unidos da Am\u00E9rica]~EUA~abbr~\n";
var tpl = new Template_1["default"]().addTransform({
    underline: {
        atob: {
            from: /___\*(.+)\*___/g,
            to: '<u>$1</u>'
        },
        btoa: {
            from: /<u>(.+)<\/u>/g,
            to: '___*$1*___'
        }
    },
    uppercase: {
        atob: {
            from: /~up~(.+)~up~/g,
            to: "<span class=\"text-uppercase\">$1</span>"
        },
        btoa: {
            from: /<span class="text-uppercase">(.+)<\/span>/g,
            to: '~up~$1~up~'
        }
    },
    abbrev: {
        atob: {
            replace: function (text) { return text.replace(/~abbr=\[(.+)\]~(.+)~abbr~/g, "<abbr title=\"$1\">$2</abbr>"); }
        },
        btoa: {
            from: /<abbr title="(.+)">(.+)<\/abbr>/g,
            to: '~abbr=[$1]~$2~abbr~'
        }
    }
});
console.info('\n\nORIG: ', JSON.stringify(inputText));
var atob = tpl.atob(inputText);
var btoa = tpl.btoa(atob);
console.info('\n\nAtob: ', JSON.stringify(atob));
console.info('\n\nBtoa: ', JSON.stringify(btoa));
//# sourceMappingURL=index.js.map