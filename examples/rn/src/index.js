import * as React from 'react'
import { View, Text, AsyncStorage, StyleSheet, Button } from 'react-native'
import { observer } from 'mobx-react/native'
import { create } from 'mobx-persist'

import { CountStore, MapStore } from './store'

const hydrate = create({ storage: AsyncStorage })
const countStore = new CountStore
const mapStore = new MapStore
hydrate('count', countStore)
hydrate('map', mapStore)

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
                <Button title="Test Map" onPress={() =>  mapStore.test(`${Date.now()}`)} />
                {
                    mapStore.items.entries().map(([key, value]) => (
                        <Text key={key}>{key}: {value.info}</Text>
                    ))
                }
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
