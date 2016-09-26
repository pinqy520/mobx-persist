import { observable } from 'mobx';
import { persist } from 'mobx-persist'

class AppState {
  @persist @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
}

export default AppState;
