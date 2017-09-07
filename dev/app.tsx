import * as React from 'react'
import { observer } from 'mobx-react'
const DevTools = require('mobx-react-devtools').default

@observer
class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>{this.props.appState.count}</div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.count}
        </button>
        <button onClick={this.onAdd}>Class List Count: {
          this.props.appState.counts
          }</button>
        <div>
          {this.props.appState.item.added}
        </div>
          <div>
            <button onClick={this.onDate}>Date Test</button>
            {this.props.appState.date && this.props.appState.date.toLocaleString()}
            instanceof Date: {(this.props.appState instanceof Object).toString()}
          </div>
        <button onClick={this.onPut}>put</button>
        <button onClick={this.onArrayIndex}>index test {this.props.appState.objectList[0].test}, {this.props.appState.objectList[3][0].test}, {this.props.appState.objectList.length}</button>
        {
          this.props.appState.list.map((item: number, idx: number) => <div key={idx}>{item}</div>)
        }
        <DevTools />
      </div>
    );
  }
  onAdd = () => {
    this.props.appState.add()
  }
  onDate = () => {
    this.props.appState.date = new Date
  }
  onArrayIndex = () => {
    this.props.appState.objectList[0].test++
    this.props.appState.objectList[3][0] = { test: 1 }
    this.props.appState.objectList.push({t: 1, v: 1})
  }
  onPut = () => {
    this.props.appState.put()
  }
  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App
