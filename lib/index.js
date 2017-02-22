"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var serializr_1 = require("serializr");
var Storage = require("./storage");
var merge_x_1 = require("./merge-x");
var types_1 = require("./types");
var persist_object_1 = require("./persist-object");
function persist() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0], b = args[1], c = args[2];
    if (a in types_1.types) {
        return serializr_1.serializable(types_1.types[a](b));
    }
    else if (args.length === 1) {
        return function (target) { return persist_object_1.persistObject(target, a); };
    }
    else {
        return serializr_1.serializable.apply(null, args);
    }
}
exports.persist = persist;
function create(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.storage, storage = _c === void 0 ? Storage : _c, _d = _b.stringify, stringify = _d === void 0 ? true : _d;
    return function persistStore(key, store, initialState) {
        if (initialState === void 0) { initialState = {}; }
        storage.getItem(key)
            .then(function (d) { return JSON.parse(d); })
            .then(mobx_1.action("[mobx-persist " + key + "] LOAD_DATA", function (persisted) {
            if (persisted && typeof persisted === 'object') {
                serializr_1.update(store, persisted);
            }
            merge_x_1.mergeObservables(store, initialState);
        }));
        mobx_1.reaction(function () { return serializr_1.serialize(store); }, function (data) { return storage.setItem(key, !stringify ? data : JSON.stringify(data)); });
        return store;
    };
}
exports.create = create;
