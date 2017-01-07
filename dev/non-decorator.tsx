import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { persist } from '../src'


const appState = observable({
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

const schema = {
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


const state = persist(schema)(appState)

export const noDecoratorState: any = state

function changeTitle() {
    state.title = `no decorator - last change: ${new Date().toLocaleString()}`
}
function changeObject() {
    const date = new Date
    state.someObject.a = date.getTime()
    state.someObject.b = date.toLocaleString()
}

function NoDecoratorComponent(prop: any) {
    return (
        <div>
            <div>title: {state.title}</div>
            <button onClick={changeTitle} >Change Title</button>
            <hr />
            <div>Some Object</div>
            <div>a: {state.someObject.a}</div>
            <div>b: {state.someObject.b}</div>
            <button onClick={changeObject} >Change Object</button>
        </div>
    )
}

export const NoDecorator = observer(NoDecoratorComponent)