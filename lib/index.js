"use strict";
var mobx_1 = require("mobx");
var serializr_1 = require("serializr");
var Storage = require("./storage");
var merge_x_1 = require("./merge-x");
var types = {
    'object': function (s) { return s ? serializr_1.object(s) : serializr_1.custom(function (v) { return v; }, function (v) { return v; }); },
    'list': function (s) { return s ? serializr_1.list(serializr_1.object(s)) : serializr_1.list(serializr_1.primitive()); },
    'map': function (s) { return s ? serializr_1.map(serializr_1.object(s)) : serializr_1.map(serializr_1.primitive()); }
};
function persist(arg1, arg2, arg3) {
    return (arg1 in types) ? serializr_1.serializable(types[arg1](arg2)) : serializr_1.serializable.apply(null, arguments);
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
        mobx_1.reaction(function () { return serializr_1.serialize(store); }, function (data) { return storage.setItem(key, JSON.stringify(data)); });
        return store;
    };
}
exports.create = create;
