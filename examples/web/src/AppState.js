import { observable, useStrict, action, runInAction, computed, extendObservable } from 'mobx';
import { persist } from 'mobx-persist'

useStrict(true)

class AppState {
  @persist @observable timer

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
  @action('RESET')
  resetTimer() {
    this.timer = 0;
  }
}

export default AppState;
