import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { persist } from '../src'


const data = observable({
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
        type: 'list',
        schema: {
            c: true,
            d: true
        }
    }
}


const state = persist(schema)(data)

export const noDecoratorState: any = state

function changeTitle() {
    state.title = `no decorator - last change: ${new Date().toLocaleString()}`
}
function changeObject() {
    const date = new Date
    state.someObject.a = date.getTime()
    state.someObject.b = date.toLocaleString()
}
function pushArray() {
    const date = new Date
    state.someArray.push({
        c: date.getTime(),
        d: date.toTimeString()
    })
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
            <div>list test</div>
            <button onClick={pushArray} >add item</button>
            {
                state.someArray.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <div>idx: {idx}</div>
                            <div>c: {item.c}</div>
                            <div>d: {item.d}</div>
                            <div>---</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export const NoDecorator = observer(NoDecoratorComponent)