"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializr_1 = require("serializr");
function _walk(v) {
    if (typeof v === 'object' && v)
        Object.keys(v).map(function (k) { return _walk(v[k]); });
    return v;
}
function _default() {
    return serializr_1.custom(_walk, function (v) { return v; });
}
function object(s) {
    return s ? serializr_1.object(s) : _default();
}
function list(s) {
    return serializr_1.list(object(s));
}
function map(s) {
    return serializr_1.map(object(s));
}
exports.types = { object: object, list: list, map: map };
