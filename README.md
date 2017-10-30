# Mobx Persist

[![npm version](https://badge.fury.io/js/mobx-persist.svg)](https://badge.fury.io/js/mobx-persist)

```
$ npm install mobx-persist --save
```

## Usage

``` typescript
import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'

class SomeItem {
    @persist @observable  name = 'some'
    @persist @observable count = 0
}

class SomeStore {
    @persist('object') @observable         obj = { a: 1, b: 2 }
    @persist('map')    @observable   stringMap = observable.map<string>({})
    @persist('list')   @observable     numList = [1,2,3,4]
    @persist('object', SomeItem) @observable s = new SomeItem
    @persist('map', SomeItem)    @observable m = observable.map<SomeItem>({})
    @persist('list', SomeItem)   @observable l = []
}

const hydrate = create({
    storage: localForage,   // or AsyncStorage in react-native.
                            // default: localStorage
    jsonify: false  // if you use AsyncStorage, here shoud be true
                    // default: true
})

// create the state
export const someStore = new SomeStore()

hydrate('some', someStore)
    // post hydration
    .then(() => console.log('some hydrated'))

```

without decorators

``` typescript
const data = observable({
    title: 'no decorator',
    someObject: {
        a: 1,
        b: 'b',
    },
    someArray: [{
        c: 1,
        d: 'd'
    }]
})
const schema = {
    title: true,
    someObject: {
        type: 'object',
        schema: {
            a: true,
            b: true
        }
    },
    someArray: {
        type: 'list',
        schema: {
            c: true,
            d: true
        }
    }
}
export const someStore = persist(schema)(data)
hydrate('some', state)
    .then(() => console.log('some hydrated'))
```

with initial state

``` typescript
const initialState = window.__STATE__.some || {
    obj: { a: 2, b: 1 }
}
export const someStore = new SomeStore()

hydrate('some', someStore, initialState)
    .then(() => console.log('some hydrated'))
```

re-hydration

``` typescript
const result = hydrate('some', someStore, initialState)
const rehydrate = result.rehydrate
result.then(() => console.log('some hydrated'))

setTimeout(() => {
    rehydrate().then(() => console.log('rehydrated'))
}, 3000)
```

## API

#### `persist(schema)(object)`
  - arguments
    - **schema** *string/object* Describes the type of data you are planning to persist. Not needed for JS primitive types. Options: `'object' | 'list' | 'map'` or a structured schema object.
    - **observable** *any* The observable that you are persisting.
  - returns a persistence-enabled version of **observable**
    
#### `create(config)`
  - arguments
    - **config** *object* Describes the storage container you want your data to reside in.
      - **storage** *[localForage](https://github.com/localForage/localForage)/AsyncStorage/localStorage* [localForage](https://github.com/localForage/localForage)-style storage API. localStorage for Web (default), AsyncStorage for React Native
      - **jsonify** *bool* Enables serialization as JSON
      - **debounce** *number* Debounce interval applied to storage calls (in miliseconds, default 0).
  - returns
    - **hydrate** *function* `hydrate(key, store)`
      - **key** *string* The key of your datastore that you want to hydrate from your persisted record.
      - **store** *object* The store in which that key resides.
      - returns *IHydrateResult*

#### interface `IHydrateResult`
  extends `Promise`
  - methods
    - **rehydrate** *function*
      - returns *IHydrateResult*

## Examples

- [Web](https://github.com/pinqy520/mobx-persist/tree/master/dev)
- [React Native](https://github.com/pinqy520/mobx-persist/tree/master/examples/rn)


## Dependency

- [Serializr](https://github.com/mobxjs/serializr)
