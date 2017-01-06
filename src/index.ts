import { reaction, action } from 'mobx'
import {
    serialize, deserialize, update, custom, createModelSchema, createSimpleSchema, setDefaultModelSchema,
    list as _list,
    map as _map,
    object as _object,
    primitive as _primitive,
    serializable
} from 'serializr'
import * as Storage from './storage'
import { mergeObservables } from './merge-x'

export declare type Types = 'object' | 'list' | 'map'

const types: { [key: string]: ((s?: any) => any) } = {
    'object': (s: any) => s ? _object(s) : custom((v: any) => v, (v: any) => v),
    'list': (s: any) => s ? _list(_object(s)) : _list(_primitive()),
    'map': (s: any) => s ? _map(_object(s)) : _map(_primitive())
}

export function persist(schema: Object): <T>(target: T) => T // object
export function persist(schema: Object): ClassDecorator // class
export function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void // two
export function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void // method decorator
export function persist(...args: any[]): any {
    const [a, b, c] = args
    if (a in types) {
        return serializable(types[a](b))
    } else if (args.length === 1) {
        return (target: any) => persistClassOrObject(target, a)
    } else {
        return serializable.apply(null, args)
    }
}

export interface optionsType {
    storage?: Storage.IStorage | any
}

export function create(options: optionsType = {}) {
    let storage = Storage
    if (options.storage && options.storage !== window.localStorage) {
        storage = options.storage
    }
    return function persistStore<T extends Object>(key: string, store: T, initialState: any = {}): T {
        storage.getItem(key)
            .then((d: string) => JSON.parse(d))
            .then(action(`[mobx-persist ${key}] LOAD_DATA`, (persisted: any) => {
                if (persisted && typeof persisted === 'object') {
                    update(store, persisted)
                }
                mergeObservables(store, initialState)
            }))
        reaction(
            () => serialize(store),
            (data: any) => storage.setItem(key, JSON.stringify(data))
        )
        return store
    }
}

// const demo = {
//     title: true,
//     name: {
//         type: 'object',
//         schema: Haha
//     }
// }

export function persistClassOrObject(target: any, params: any) {
    const schema: { [key: string]: any } = {}
    Object.keys(params).forEach(key => {
        if (typeof params[key] === 'object') {
            if (params[key].type in types) {
                schema[key] = types[params[key].type](params[key].schema)
                return
            }
        }
        schema[key] = true
    })
    if (typeof target === 'function') {
        createModelSchema(target, schema)
    } else if (typeof target === 'object') {
        const model = createSimpleSchema(schema)
        setDefaultModelSchema(target, model)
    }
    return target
}