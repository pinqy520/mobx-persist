import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

export class CountStore {
    @persist @observable count = 0
    @action inc() {
        this.count = this.count + 1
    }
}