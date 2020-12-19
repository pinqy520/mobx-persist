import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { create } from '../mobx-persist';
import { AppState } from './state';

const hydrate = create({})

const appState = new AppState()
hydrate('appState', appState, (window as any).__INITIAL_STATE__.app)
  .then(() => console.log('appState hydrated'))

render(
  <App appState={appState} />,
  document.getElementById('root')
)

