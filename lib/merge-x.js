"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
function mergeObservables(target, source) {
    var t = target;
    var s = source;
    if (typeof t === 'object' && typeof s === 'object') {
        for (var key in t) {
            if (t[key] && typeof t[key] === 'object' && typeof s[key] === 'object') {
                if (mobx_1.isObservableMap(t[key]))
                    t[key].merge(s[key]);
                else if (mobx_1.isObservableArray(t[key]))
                    t[key].replace(s[key]);
                else if (mobx_1.isObservableObject(t[key]))
                    t[key] = mergeObservables(t[key], s[key]);
            }
            else if (s[key] !== undefined) {
                t[key] = s[key];
            }
        }
    }
    return t;
}
exports.mergeObservables = mergeObservables;
