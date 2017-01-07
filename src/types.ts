import {
    list as _list,
    map as _map,
    object as _object,
    custom
} from 'serializr'

function _default () {
    return custom((v: any) => v, (v: any) => v)
}

function object(s: any) {
    return s ? _object(s) : _default ()
}

function list(s: any) {
    return _list(object(s))
}

function map(s: any) {
    return _map(object(s))
}

export type Types = 'object' | 'list' | 'map'
export const types: { [key: string]: ((s?: any) => any) } = { object, list, map }
