# Mobx Persist

[![npm version](https://badge.fury.io/js/mobx-persist.svg)](https://badge.fury.io/js/mobx-persist)

```
$ npm install mobx-persist --save
```

## Usage

``` typescript
import { observable, asMap } from 'mobx'
import { create, persist   } from 'mobx-persist'

class SomeItem {
    @persist @observable  name = 'some'
    @persist @observable count = 0
}

class SomeStore {
    @persist('object') @observable         obj = { a: 1, b: 2 }
    @persist('map')    @observable   stringMap = asMap<string>({})
    @persist('list')   @observable     numList = [1,2,3,4]
    @persist('object', SomeItem) @observable s = new SomeItem
    @persist('map', SomeItem)    @observable m = asMap<SomeItem>({})
    @persist('list', SomeItem)   @observable l = []
}

const persistStore = create({
    storage: AsyncStorage // default localStorage
})

export const someStore = persistStore('some', new SomeStore)

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
const state = persist(schema)(data)
export const someStore = persistStore('some', state)
```

with initial state

``` typescript
const initialState = window.__STATE__.some || {
    obj: { a: 2, b: 1 }
}
export const someStore = persistStore('some', new SomeStore, initialState)
```

## Examples

- [Web](https://github.com/pinqy520/mobx-persist/tree/master/examples/web)
- [React Native](https://github.com/pinqy520/mobx-persist/tree/master/examples/rn)


## Dependency

- [Serializr](https://github.com/mobxjs/serializr)
