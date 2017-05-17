import {
    list as _list,
    map as _map,
    object as _object,
    custom
} from 'serializr'

function _walk(v: any) {
    if (typeof v === 'object' && v) Object.keys(v).map(k => _walk(v[k]))
    return v
}

function _default() {
    return custom(_walk, (v: any) => v)
}

function object(s: any) {
    return s ? _object(s) : _default()
}

function list(s: any) {
    return _list(object(s))
}

function map(s: any) {
    return _map(object(s))
}

export type Types = 'object' | 'list' | 'map'
export const types: { [key: string]: ((s?: any) => any) } = { object, list, map }
