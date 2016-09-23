# Mobx Persist

```
$ npm install github:pinqy520/mobx-persist --save
```

## Usage

``` typescript
import { observable, asMap } from 'mobx'
import { create, persist } from 'mobx-resist'

class SomeItem {
    @persist @observable name = 'some'
    @persist @observable count = 0
}

class SomeStore {
    @persist('object') @observable i = { a: 1, b: 2 }
    @persist('map', SomeItem) @observable m = asMap<SomeItem>({})
    @persist('list', SomeItem) @observable l = []
}

const createStore = create({
    storage: AsyncStorage // or localStorage
})

export const someStore = createStore('some', SomeStore)

```