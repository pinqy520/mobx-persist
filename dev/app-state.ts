import { observable, useStrict, action, runInAction, computed, extendObservable, ObservableMap } from 'mobx'
import { persist } from '../src'
// import { serializable } from 'serializr'

// useStrict(true)

export class Item {
  @persist @observable prop = 1
  @persist @observable added = 3
}


class AppState {
  @persist @observable timer: any
  @persist('list') @observable list: number[] = [2, 22]
  @persist('list') @observable objectList: any[] =  [{test: 1}, null, undefined, [1]]
  @persist('map', Item) @observable map = observable.map<Item>({})
  @persist('object', Item) @observable item = new Item
  @persist('object') @observable date: Date

  constructor() {
    setInterval(this.inc.bind(this), 2000);
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

export default AppState;
