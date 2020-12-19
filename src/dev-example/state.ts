import { observable, action, computed, makeObservable } from 'mobx'
import { serializable } from 'serializr'
import { persist } from '../mobx-persist'

// useStrict(true)

export class Item {
  @serializable @observable prop = 1
  @serializable @observable added = 3
  @computed get item() {
    return this.prop + this.added
  }
}



export class AppState {
  @persist @observable timer: any = 0
  @persist('list') @observable list: number[] = [2, 22]
  // @persist('list', Item) @observable classList: Item[] = []
  @persist('list') @observable objectList: any[] = [{ test: 1 }, null, undefined, [1]]
  @persist('map', Item) @observable map = observable.map<number, Item>({})
  @persist('object', Item) @observable item = new Item()
  @persist('date') @observable date = new Date()

  constructor() {
    makeObservable(this)
    setInterval(this.inc.bind(this), 2000);
  }
  @action('ADD')
  add() {
    this.map.set(Date.now(), new Item())
  }
  @computed
  get counts() {
    return Array.from(this.map.values()).reduce((prev, value) => prev + value.item, 0)
  }
  @computed
  get count() {
    return this.timer - 10
  }
  @action('INC')
  inc() {
    this.timer += 1;
  }
  @action('PUT')
  put() {
    this.list.push(this.timer)
  }
  @action('RESET')
  resetTimer() {
    this.timer = 0
    this.list = []
  }
}

