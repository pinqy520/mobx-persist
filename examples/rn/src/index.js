import * as React from 'react'
import { View, Text, AsyncStorage, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { create } from 'mobx-persist'

import { CountStore } from './store'

const persistStore = create({ storage: AsyncStorage })
const countStore = persistStore('count', new CountStore)

@observer
class Test extends React.Component {
    componentDidMount() {
        this.timer = setInterval(() => countStore.inc(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Count: {countStore.count}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})

export function App() {
    return <Test />
}
