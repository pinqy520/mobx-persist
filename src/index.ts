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
    storage?: any,
    jsonify: boolean
}

export function create({
    storage = Storage as any,
    jsonify = true
}: any = {}) {
    if (typeof localStorage !== 'undefined' && localStorage === storage) storage = Storage
    return function hydrate<T extends Object>(key: string, store: T, initialState: any = {}): Promise<T> {
        const hydration = storage.getItem(key)
            .then((d: any) => !jsonify ? d : JSON.parse(d))
            .then(action(
                `[mobx-persist ${key}] LOAD_DATA`,
                (persisted: any) => {
                    if (persisted && typeof persisted === 'object') {
                        update(store, persisted)
                    }
                    mergeObservables(store, initialState)
                    return store
                }
            ))

        reaction(
            () => serialize(store),
            (data: any) => storage.setItem(key, !jsonify ? data : JSON.stringify(data))
        )

        return hydration
    }
}

