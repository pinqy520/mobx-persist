import { observable, configure, action, runInAction, computed, extendObservable, ObservableMap, IObservableArray } from 'mobx'
import { persist } from '../src'
import { serializable, list, object } from 'serializr'

// useStrict(true)

export class Item {
  @serializable @observable prop = 1
  @serializable @observable added = 3
  @computed get item() {
    return this.prop + this.added
  }
}

export class BaseState {

}


class AppState extends BaseState 
{
  @persist @observable timer: any = 0
  @persist('list') @observable list: number[] = [2, 22]
  @persist('list', Item) @observable classList: Item[] = []
  @persist('list') @observable objectList: any[] = [{ test: 1 }, null, undefined, [1]]
  @persist('map', Item) @observable map = observable.map<Item>({})
  @persist('object', Item) @observable item = new Item
  @persist('object') @observable date: Date

  constructor() {
    super()
    setInterval(this.inc.bind(this), 2000);
  }
  @action('ADD')
  add() {
    this.classList.push(new Item)
  }
  @computed
  get counts() {
    return this.classList.reduce((prev, value) => prev + value.item, 0)
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
