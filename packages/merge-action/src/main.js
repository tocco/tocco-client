import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import {Provider} from 'react-redux'
import MergeMatrixContainer from './containers/MergeMatrixContainer'
import dispatchInput from './utils/DispatchInput'
import CoreLayout from './layouts/CoreLayout'
import {registerEvents} from './utils/ExternalEvents'

const init = (id, input, externalEvents) => {
  var inititalState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

  if (__DEV__) {
    input = require('./dev_input.json')
  }
  
  if (input) {
    inititalState.input = input
  }

  if (externalEvents) registerEvents(externalEvents)

  const store = createStore(inititalState)

  dispatchInput(store)

  const App = () => (
    <Provider store={store}>
      <CoreLayout>
        <MergeMatrixContainer/>
      </CoreLayout>
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

      ReactDOM.render(<RedBox error={error}/>, mountElement)
    }
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }
    //module.hot.accept(['./routes/index'], () => render())
  }

  // if (__DEBUG__) {
  //   if (window.devToolsExtension) window.devToolsExtension.open('buttom')
  // }

  render()
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register('merge-action', init) //TODO: replace string with var
  }
}
