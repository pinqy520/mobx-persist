import { observable, useStrict, action, runInAction, computed, extendObservable } from 'mobx'
import { persist } from '../src'

// useStrict(true)

export const appState: any = observable({
    title: 'no decorator',
    someObject: {
        a: 1,
        b: 'b',
    },
    someArray: [{
        c: 1,
        d: 'd'
    }]
})


export const schema = {
    title: true,
    someObject: {
        type: 'object',
        schema: {
            a: true,
            b: true
        }
    },
    someArray: {
        type: 'array',
        schema: {
            c: true,
            d: true
        }
    }
}


export default persist(schema)(appState) as any
