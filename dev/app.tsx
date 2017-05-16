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
        <button onClick={this.onPut}>put</button>
        <button onClick={this.onArrayIndex}>index test</button>
        {
          this.props.appState.list.map((item: number, idx: number) => <div key={idx}>{item}</div>)
        }
        <DevTools />
      </div>
    );
  }
  onArrayIndex = () => {
    this.props.appState.list[0]++
  }
  onPut = () => {
    this.props.appState.put()
  }
  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App
