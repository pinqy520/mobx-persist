import  * as React from 'react'
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
        <DevTools />
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  }
};

export default App
