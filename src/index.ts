import Storage from 'react-native-storage'
import { reaction } from 'mobx'
import { serialize, deserialize, update, custom, list as _list, map as _map, object as _object, serializable } from 'serializr'

declare type Types = 'object' | 'list' | 'map'

const types: { [key: string]: ((s?: any) => any) } = {
    'object': (s: any) => s ? _object(s) : custom((v: any) => v, (v: any) => v),
    'list': (s: any) => _list(_object(s)),
    'map': (s: any) => _map(_object(s))
}

export function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void
export function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void
export function persist(arg1: any, arg2: any, arg3?: any): any {
    return (arg1 in types) ? serializable(types[arg1](arg2)) : serializable.apply(null, arguments)
}

interface optionsTyoe {
    storage: any
}

export function create(options: optionsTyoe) {
    const storage = new Storage({
        storageBackend: options.storage
    })
    return function createStore<T>(key: string, storeClass: any): T {
        const store = new storeClass
        storage.load({ key })
            .then((persisted: any) => update(store, persisted))
        reaction(
            key, () => serialize(store),
            (data: any) => storage.save({ key, rawData: data })
        )
        return store
    }
}

