import { reaction, transaction, isObservableMap, isObservableArray, isObservableObject } from 'mobx'
import {
    serialize, deserialize, update, custom,
    list as _list,
    map as _map,
    object as _object,
    primitive as _primitive,
    serializable
} from 'serializr'
import * as Storage from './storage'

export declare type Types = 'object' | 'list' | 'map'

const types: { [key: string]: ((s?: any) => any) } = {
    'object': (s: any) => s ? _object(s) : custom((v: any) => v, (v: any) => v),
    'list': (s: any) => s ? _list(_object(s)) : _list(_primitive()),
    'map': (s: any) => s ? _map(_object(s)) : _map(_primitive())
}

export function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void
export function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void

export function persist(arg1: any, arg2: any, arg3?: any): any {
    return (arg1 in types) ? serializable(types[arg1](arg2)) : serializable.apply(null, arguments)
}

export interface optionsType {
    storage?: any
}

export function create(options: optionsType = {}) {
    let storage = Storage
    if (options.storage && options.storage !== window.localStorage) {
        storage = options.storage
    }
    return function persistStore<T extends Object>(key: string, store: T, initialState: any = {}): T {
        storage.getItem(key)
            .then((d: string) => JSON.parse(d))
            .then((persisted: any) => transaction(() => {
                if (persisted && typeof persisted === 'object') {
                    update(store, persisted)
                }
                mergeObservables(store, initialState)
            }))
        reaction(
            key, () => serialize(store),
            (data: any) => storage.setItem(key, JSON.stringify(data))
        )
        return store
    }
}

export function mergeObservables<A extends Object, B extends Object>(target: A, source: B): A {
    let t: any = target
    let s: any = source
    if (typeof t === 'object') {
        for (let key in t) {
            if (typeof t[key] === 'object' && typeof s[key] === 'object') {
                if (isObservableMap(t[key])) return t[key].merge(s[key])
                if (isObservableArray(t[key])) return t[key].replace(s[key])
                if (isObservableObject(t[key])) t[key] = mergeObservables(t[key], s[key])
                else t[key] = s[key]
            } else {
                t[key] = s[key]
            }
        }
    }
    return t
}

