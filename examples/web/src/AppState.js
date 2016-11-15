import { observable, useStrict, action, runInAction } from 'mobx';
import { persist } from 'mobx-persist'

useStrict(true)

class AppState {
  @persist @observable timer = 0;

  constructor() {
    setInterval(this.inc.bind(this), 1000);
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
