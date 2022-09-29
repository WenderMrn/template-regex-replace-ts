"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var types_1 = require("./types");
var Transformers_1 = require("./Transformers");
var Template = /** @class */ (function () {
    function Template() {
        this.mapTransformation = Transformers_1["default"];
    }
    Template.prototype.replaceText = function (text, type) {
        if (!text)
            return text;
        var output = text;
        var keys = Object.keys(this.mapTransformation);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var name = keys_1[_i];
            var t = this.mapTransformation[name];
            var operation = type === types_1.TypeOperation.Atob ? t.atob : t.btoa;
            if (operation.from && operation.to) {
                output = output.replace(operation.from, operation.to);
            }
            if (operation.replace) {
                output = operation.replace(output);
            }
        }
        return output;
    };
    /**
     * Return the names available transformations.
     * @returns string[]
     */
    Template.prototype.getTransformationsName = function () {
        return Object.keys(this.mapTransformation);
    };
    /**
     * Select one or more transformations to use on atob or btoa methods
     * @returns new template instance
     */
    Template.prototype.pickTransformation = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var transformations = {};
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var name = names_1[_a];
            if (this.mapTransformation[name]) {
                transformations[name] = this.mapTransformation[name];
            }
        }
        return new Template().replaceTransformations(transformations);
    };
    /**
     * Omit one or more transformations you don't use on atob or btoa methods
     * @returns new template instance
     */
    Template.prototype.omitTransformation = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var transformations = {};
        for (var name in this.mapTransformation) {
            if (!names.includes(name)) {
                transformations[name] = this.mapTransformation[name];
            }
        }
        return new Template().replaceTransformations(transformations);
    };
    /**
     * Receives a original text with marks and apply transformations.
     * @param text
     * @returns transformedText
     */
    Template.prototype.atob = function (text) {
        return this.replaceText(text, types_1.TypeOperation.Atob);
    };
    /**
     * Receives a transformed text and revert transformations on text.
     * @param transformedText
     * @returns text
     */
    Template.prototype.btoa = function (transformedText) {
        return this.replaceText(transformedText, types_1.TypeOperation.Btoa);
    };
    /**
     * Add a new rule transformation to the default transformations existing.
     * @param transformations
     * @returns
     */
    Template.prototype.addTransform = function () {
        var transformations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            transformations[_i] = arguments[_i];
        }
        this.mapTransformation = Object.assign.apply(Object, __spreadArray([this.mapTransformation], transformations, false));
        return this;
    };
    /**
     * Replace all transformations default by the transformations passed by.
     * @param transformations
     * @returns
     */
    Template.prototype.replaceTransformations = function (transformations) {
        this.mapTransformation = transformations;
        return this;
    };
    /**
     * Clears all transformations and return a Template instance
     * @returns Template instance
     */
    Template.prototype.clearTransformations = function () {
        this.mapTransformation = {};
        return this;
    };
    /**
     * Reset transformation to default values
     * @returns Template instance
     * @deprecated Please use resetTransformations
     */
    Template.prototype.resetTransformation = function () {
        return this.resetTransformations();
    };
    /**
     * Reset transformations to default values
     * @returns Template instance
     */
    Template.prototype.resetTransformations = function () {
        this.mapTransformation = Transformers_1["default"];
        return this;
    };
    return Template;
}());
exports["default"] = Template;
//# sourceMappingURL=Template.js.map