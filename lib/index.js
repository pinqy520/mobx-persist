"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.persist = void 0;
var mobx_1 = require("mobx");
var serializr_1 = require("serializr");
var Storage = __importStar(require("./storage"));
var merge_1 = __importDefault(require("lodash/merge"));
var types_1 = require("./types");
function persist() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0], b = args[1], c = args[2];
    if (a in types_1.types) {
        return serializr_1.serializable(types_1.types[a](b));
    }
    else {
        return serializr_1.serializable(a, b, c);
    }
}
exports.persist = persist;
function create(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.storage, storage = _c === void 0 ? Storage : _c, _d = _b.jsonify, jsonify = _d === void 0 ? true : _d, _e = _b.debounce, debounce = _e === void 0 ? 0 : _e;
    if (typeof localStorage !== 'undefined' && localStorage === storage)
        storage = Storage;
    return function hydrate(key, store, initialState, customArgs) {
        if (initialState === void 0) { initialState = {}; }
        if (customArgs === void 0) { customArgs = {}; }
        var schema = serializr_1.getDefaultModelSchema(store);
        function hydration() {
            var promise = storage.getItem(key)
                .then(function (d) { return !jsonify ? d : JSON.parse(d); })
                .then(mobx_1.action("[mobx-persist " + key + "] LOAD_DATA", function (persisted) {
                var data = merge_1.default({}, persisted, initialState);
                serializr_1.update(schema, store, data, void 0, customArgs);
                return store;
            }));
            promise.rehydrate = hydration;
            return promise;
        }
        var result = hydration();
        mobx_1.reaction(function () { return serializr_1.serialize(schema, store); }, function (data) { return storage.setItem(key, !jsonify ? data : JSON.stringify(data)); }, { delay: debounce });
        return result;
    };
}
exports.create = create;
//# sourceMappingURL=index.js.map