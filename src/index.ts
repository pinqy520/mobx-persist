import { reaction, action } from 'mobx'
import {
    serialize, deserialize,
    update,
    serializable, getDefaultModelSchema
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
    storage?: any
    jsonify?: boolean
    debounce?: number
    sync?: boolean
}

export function create({
    storage = Storage as any,
    jsonify = true,
    debounce = 0,
    sync = true
}: any = {}) {
    if (typeof localStorage !== 'undefined' && localStorage === storage) storage = Storage
    return function hydrate<T extends Object>(key: string, store: T, initialState: any = {}): Promise<T> {
        const updateStore = (persisted: any) => {
            if (persisted && typeof persisted === 'object') {
                update(getDefaultModelSchema(store as any), store, persisted)
            }
            mergeObservables(store, initialState)
            return store
        }

        const hydration = storage.getItem(key)
            .then((d: any) => !jsonify ? d : JSON.parse(d))
            .then(action(`[mobx-persist ${key}] LOAD_DATA`, updateStore))

        reaction(
            () => serialize(store),
            (data: any) => storage.setItem(key, !jsonify ? data : JSON.stringify(data)),
            {
                delay: debounce
            }
        )

        if (sync && window)
        {
            window.addEventListener("storage", (event) => {
                if(!event.newValue) return
                action(`[mobx-persist ${key}] REFRESH_DATA`, updateStore)
                (!jsonify ? event.newValue : JSON.parse(event.newValue))
            }, false)
        }

        return hydration
    }
}
