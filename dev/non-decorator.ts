import { observable, useStrict, action, runInAction, computed, extendObservable } from 'mobx'
import { persist } from '../src'

// useStrict(true)

export const appState = observable({
    timer: 1,
    get count() {
        return this.timer - 10
    }
}) as any

setInterval(() => {
    appState.timer += 1;
}, 2000);

export default persist({
    timer: true
})(appState) as any
