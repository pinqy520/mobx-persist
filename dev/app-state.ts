import { observable, useStrict, action, runInAction, computed, extendObservable } from 'mobx'
import { persist } from '../src'
// import { serializable } from 'serializr'

// useStrict(true)

class AppState {
  @persist @observable timer: any
  @persist('list') @observable list: number[] = [2, 22]

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
