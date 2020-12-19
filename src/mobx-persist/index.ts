import { reaction, action } from 'mobx'
import {
  serialize,
  update,
  serializable, 
  getDefaultModelSchema
} from 'serializr'
import * as Storage from './storage'
import merge from 'lodash/merge'
import { types, Types } from './types'

export function persist(type: Types, schema?: any): PropertyDecorator | any
export function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void
export function persist(...args: any[]) {
  const [a, b, c] = args
  if (a in types) {
    return serializable(types[a](b))
  } else {
    return serializable(a, b, c)
  }
}

export interface HydrateFactoryOption {
  storage?: any
  jsonify?: boolean
  debounce?: number
}

export interface HydrateResult<T> extends Promise<T> {
  rehydrate: () => HydrateResult<T>
}

export function create({
  storage = Storage,
  jsonify = true,
  debounce = 0
}: HydrateFactoryOption = {}) {
  if (typeof localStorage !== 'undefined' && localStorage === storage) storage = Storage
  return function hydrate<T extends Object>(key: string, store: T, initialState: any = {}, customArgs: any = {}): HydrateResult<T> {
    const schema = getDefaultModelSchema(store as any)!
    function hydration() {
      const promise: HydrateResult<T> = storage.getItem(key)
        .then((d: any) => !jsonify ? d : JSON.parse(d))
        .then(action(
          `[mobx-persist ${key}] LOAD_DATA`,
          (persisted: any) => {
            const data = merge({}, persisted, initialState)
            update(schema, store, data, void 0, customArgs)
            return store
          }
        ))
      promise.rehydrate = hydration
      return promise
    }
    const result = hydration()
    reaction(
      () => serialize(schema, store),
      (data: any) => storage.setItem(key, !jsonify ? data : JSON.stringify(data)),
      { delay: debounce }
    )
    return result
  }
}

