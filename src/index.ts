import { reaction, action } from 'mobx'
import {
    serialize, deserialize,
    update,
    serializable
} from 'serializr'
import * as Storage from './storage'
import { mergeObservables } from './merge-x'
import { types, Types } from './types'
import { persistObject } from './persist-object'

export function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void // two
export function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void // method decorator
export function persist(schema: Object): <T>(target: T) => T // object
export function persist(...args: any[]): any {
    const [a, b, c] = args
    if (a in types) {
        return serializable(types[a](b))
    } else if (args.length === 1) {
        return (target: any) => persistObject(target, a)
    } else {
        return serializable.apply(null, args)
    }
}

export interface optionsType {
    storage?: Storage.IStorage | any,
    stringify?: boolean
}

export function create({
    storage = Storage,
    stringify = true
}: optionsType = {}) {
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
            (data: any) => storage.setItem(key,
                !stringify ? data : JSON.stringify(data))
        )
        return store
    }
}

