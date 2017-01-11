"use strict";
var serializr_1 = require("serializr");
function _default() {
    return serializr_1.custom(function (v) { return v; }, function (v) { return v; });
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
