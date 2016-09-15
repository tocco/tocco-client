import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import {Provider} from 'react-redux'

import MergeWizardContainer from './containers/MergeWizardContainer'
import dispatchInput from './utils/DispatchInput'
import {registerEvents} from './utils/ExternalEvents'

import './styles/core.scss'

const init = (id, input, externalEvents) => {
  var initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}
  if (__DEV__) {
    input = require('./dev_input.json')
  }

  if (input) {
    initialState.input = input
  }

  if (externalEvents) registerEvents(externalEvents)
  const store = createStore(initialState)

  dispatchInput(store)

  const App = () => (
    <Provider store={store}>
      <MergeWizardContainer/>
    </Provider>
  )

  return App
}

if (__DEV__) {
  const mountElement = document.getElementById('root')

  let render = () => {
    const element = React.createElement(init())
    ReactDOM.render(element, mountElement)
  }

  if (__DEV__ && module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react')

      ReactDOM.render(<RedBox error={error}/>, mountElement)
    }
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }
  }

  render()
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register('merge-action', init) // TODO: replace string with var
  }
}
