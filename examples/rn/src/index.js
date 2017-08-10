import * as React from 'react'
import { View, Text, AsyncStorage, StyleSheet, Button } from 'react-native'
import { observer } from 'mobx-react/native'
import { create } from 'mobx-persist'

import { CountStore, MapStore, ListStore } from './store'

const hydrate = create({ storage: AsyncStorage })
const countStore = new CountStore
const mapStore = new MapStore
const listStore = new ListStore
hydrate('count', countStore)
hydrate('map', mapStore)
hydrate('list', listStore)

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
                <Button title="Test Map" onPress={() => mapStore.test(`${Date.now()}`)} />
                <Button title="Test List" onPress={() => listStore.test()} />
                {
                    mapStore.items.entries().map(([key, value]) => (
                        <Text key={key}>{key}: {value.info}</Text>
                    ))
                }
                {
                    listStore.list.map((item, index) => {
                        return <Text key={index}>{item.text}</Text>
                    })
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
