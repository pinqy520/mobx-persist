import * as React from 'react'
import { render } from 'react-dom'
const { AppContainer } = require('react-hot-loader')
import AppState from './app-state'
import App from './app'
import { noDecoratorState, NoDecorator } from './non-decorator'
import { create } from '../src'

const hydrate = create({})

const appState = new AppState
hydrate('appState', appState, (window as any).__INITIAL_STATE__.app)
  .then(() => console.log('appState hydrated'))
hydrate('noDecoratorState', noDecoratorState)
  .then(() => console.log('noDecoratorState hydrated'))

render(
  <AppContainer>
    <div>
      <App appState={appState} />
      <hr />
      <NoDecorator />
    </div>
  </AppContainer>,
  document.getElementById('root')
)

const m: any = module

if (m.hot) {
  m.hot.accept('./app', () => {
    const NextApp = require('./app').default;

    render(
      <AppContainer>
        <div>
          <App appState={appState} />
          <hr />
          <NoDecorator />
        </div>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
