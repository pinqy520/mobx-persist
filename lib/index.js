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
function create(options) {
    if (options === void 0) { options = {}; }
    var storage = Storage;
    if (options.storage && options.storage !== window.localStorage) {
        storage = options.storage;
    }
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
        mobx_1.reaction(function () { return serializr_1.serialize(store); }, function (data) { return storage.setItem(key, !options.stringify ? data : JSON.stringify(data)); });
        return store;
    };
}
exports.create = create;
