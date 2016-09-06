import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import { Provider } from 'react-redux'
import PasswordUpdateDialog from './containers/PasswordUpdateDialogContainer'

const init = (id, input) => {
  var initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

  if (__DEV__) {
    input = require('./dev_input.json')
  }

  if (input) {
    initialState.input = input
  }

  const store = createStore(initialState)

  const App = () => (
    <Provider store={store}>
      <PasswordUpdateDialog/>
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

  // Enable HMR and catch runtime errors in RedBox
  // This code is excluded from production bundle
  if (__DEV__ && module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react')

      ReactDOM.render(<RedBox error={error} />, mountElement)
    }
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }
    render()
  }

  render()
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register('password-update', init) //TODO: replace string with var
  }
}
