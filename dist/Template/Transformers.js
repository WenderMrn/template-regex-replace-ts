"use strict";
exports.__esModule = true;
function simpleTagTransformation(_a) {
    var tagName = _a.tagName, symbol = _a.symbol, markdown = _a.markdown;
    return {
        atob: {
            from: RegExp("".concat(symbol).concat(markdown).concat(symbol, "([\\s\\S]*?)").concat(symbol).concat(markdown).concat(symbol), 'g'),
            to: "<".concat(tagName, ">$1</").concat(tagName, ">")
        },
        btoa: {
            from: RegExp("<".concat(tagName, ">([\\s\\S]*?)</").concat(tagName, ">"), 'g'),
            to: "".concat(symbol).concat(markdown).concat(symbol, "$1").concat(symbol).concat(markdown).concat(symbol)
        }
    };
}
var bold = {
    atob: {
        from: /\*\*([\s\S]*?)\*\*/g,
        to: '<b>$1</b>'
    },
    btoa: {
        from: /<b>([\s\S]*?)<\/b>/g,
        to: '**$1**'
    }
};
var newLine = {
    atob: {
        from: /\n/g,
        to: '<br/>'
    },
    btoa: {
        from: /(<br \/>|<br\/>|<br>)/g,
        to: '\n'
    }
};
var tab = {
    atob: {
        from: /\t/g,
        to: '&#9;'
    },
    btoa: {
        from: /"&#9;/g,
        to: '\t'
    }
};
var italic = {
    atob: {
        from: /~~([\s\S]*?)~~/g,
        to: '<i>$1</i>'
    },
    btoa: {
        from: /<i>([\s\S]*?)<\/i>/g,
        to: '~~$1~~'
    }
};
var link = {
    atob: {
        replace: function (text) {
            var output = text;
            var regex = /\[([\s\S]*?)\]\((\S*)\)(?:{(?<={)([\s\S]*?)(?=})})?/;
            var _loop_1 = function () {
                var matchs = regex.exec(output) || [];
                if (matchs[3]) {
                    var attrsStr = "{".concat(matchs[3], "}");
                    try {
                        var obj_1 = JSON.parse(attrsStr);
                        var attrs = Object.keys(obj_1)
                            .map(function (name) { return "".concat(name, "=\"").concat(obj_1[name], "\""); })
                            .join(' ');
                        if (attrs) {
                            output = output.replace(regex, "<a href=\"$2\" ".concat(attrs, ">$1</a>"));
                            return "continue";
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                output = output.replace(regex, "<a href=\"$2\">$1</a>");
            };
            do {
                _loop_1();
            } while (regex.test(output));
            return output;
        }
    },
    btoa: {
        replace: function (text) {
            var _a, _b, _c;
            var output = text;
            var regex = /<a([\s\S]*?)>([\s\S]*?)<\/a>/;
            do {
                var matchs = regex.exec(output) || [];
                var listAttrs = ((_b = (_a = matchs[1]) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split(' ')) || [];
                var href = ((_c = listAttrs.find(function (a) { return a.includes('href'); })) === null || _c === void 0 ? void 0 : _c.replace(/(href=)|[|"|']/g, '')) || '';
                var attrs = listAttrs
                    .filter(function (a) { return !a.includes('href'); })
                    .map(function (item) {
                    return item
                        .split('=')
                        .map(function (a) { return (!/['|"]/g.test(a) ? "\"".concat(a, "\"") : a); })
                        .join(': ');
                })
                    .join(', ');
                if (attrs) {
                    output = output.replace(regex, "[$2](".concat(href, "){").concat(attrs, "}"));
                    continue;
                }
                output = output.replace(regex, "[$2](".concat(href, ")"));
            } while (regex.test(output));
            return output;
        }
    }
};
var underline = {
    atob: {
        from: /___\*([\s\S]*?)\*___/g,
        to: '<u>$1</u>'
    },
    btoa: {
        from: /<u>([\s\S]*?)<\/u>/g,
        to: '___*$1*___'
    }
};
var style = {
    atob: {
        from: /~style=\[([\s\S]*?)\]~([\s\S]*?)~style~/g,
        to: '<span style="$1">$2</span>'
    },
    btoa: {
        from: /<span style="([\s\S]*?)">([\s\S]*?)<\/span>/g,
        to: '~style=[$1]~$2~style~'
    }
};
var horizontalRule = {
    atob: {
        from: /(\*\*\*)|(---)/g,
        to: '<hr/>'
    },
    btoa: {
        from: /<hr\/>/g,
        to: '---'
    }
};
var titles = {
    atob: {
        from: /t[1-6]{(?<=t(\d){)([\s\S]*?)(?=})}/g,
        to: '<h$1>$2</h$1>'
    },
    btoa: {
        from: /<h[1-6]>(?<=<h([1-6])>)([\s\S]*?)(?=<\/h[1-6]>)<\/h[1-6]>/g,
        to: 't$1{$2}'
    }
};
var abbrev = {
    atob: {
        from: /~abbr=\[([\s\S]*?)\]~([\s\S]*?)~abbr~/g,
        to: '<abbr title="$1">$2</abbr>'
    },
    btoa: {
        from: /<abbr title="([\s\S]*?)">([\s\S]*?)<\/abbr>/g,
        to: '~abbr=[$1]~$2~abbr~'
    }
};
var paragraph = {
    atob: {
        from: /p{(?<=p{)([\s\S]*?)(?=})}/g,
        to: '<p>$1</p>'
    },
    btoa: {
        from: /<p>(?<=<p>)([\s\S]*?)(?=<\/p>)<\/p>/g,
        to: 'p{$1}'
    }
};
var lists = {
    atob: {
        replace: function (text) {
            var _a;
            var output = text;
            var regex = /([u|o]l)\[(?<=[u|o]l\[)([\s\S]*?)(?=\])\]/;
            if (!regex.test(output))
                return output;
            do {
                var matchs = regex.exec(output) || [];
                var items = ((_a = matchs[2]) === null || _a === void 0 ? void 0 : _a.trim().split('||')) || [];
                output = output.replace(regex, "<$1>".concat(items.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</$1>"));
            } while (regex.test(output));
            return output;
        }
    },
    btoa: {
        replace: function (text) {
            var _a, _b;
            var output = text;
            var regex = /<([u|o]l)>(<li>[\s\S]*?<\/li>)<\/[u|o]l>/;
            if (!regex.test(output))
                return output;
            do {
                var matchs = regex.exec(output) || [];
                var items = ((_b = (_a = matchs[2]) === null || _a === void 0 ? void 0 : _a.split(/<li>([\s\S]*?)<\/li>/g)) === null || _b === void 0 ? void 0 : _b.filter(function (i) { return i; }).join('||')) || '';
                output = output.replace(regex, "$1[".concat(items, "]"));
            } while (regex.test(output));
            return output;
        }
    }
};
// Simple tags
var deleted = simpleTagTransformation({ tagName: 'del', markdown: 'del', symbol: '~' });
var subscript = simpleTagTransformation({ tagName: 'sub', markdown: 'sub', symbol: '~' });
var superscript = simpleTagTransformation({ tagName: 'sup', markdown: 'sup', symbol: '~' });
var transformations = {
    bold: bold,
    newLine: newLine,
    tab: tab,
    italic: italic,
    link: link,
    underline: underline,
    style: style,
    deleted: deleted,
    subscript: subscript,
    superscript: superscript,
    horizontalRule: horizontalRule,
    titles: titles,
    abbrev: abbrev,
    paragraph: paragraph,
    lists: lists
};
exports["default"] = transformations;
//# sourceMappingURL=Transformers.js.map