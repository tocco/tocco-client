import React from 'react'
import ReactDOM from 'react-dom'
import createHashHistory from 'history/lib/createHashHistory'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import { Provider } from 'react-redux'
import useMultiHash from './history/useMultiHash'

const init = (id, input) => {
  // Configure history for react-router
  const hashHistory = useRouterHistory(useMultiHash(createHashHistory))({
    basename: __BASENAME__,
    queryKey: false,
    id
  })


  var inititalState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

  //input = {entityName: 'Membership', selectedEntities:[ '1', '2']}

  if (input) {
    inititalState.input = input
  }
  const store = createStore(inititalState, hashHistory)
  const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState: (state) => state.router
  })

  const routes = require('./routes/index').default(store)

  const App = () => (
    <Provider store={store}>
      <Router history={history} children={routes} />
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
    module.hot.accept(['./routes/index'], () => render())
  }

  if (__DEBUG__) {
    if (window.devToolsExtension) window.devToolsExtension.open()
  }

  render()
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register("tocco-prototype", init)
  }
}
