import {route} from 'tocco-util'
import {appFactory} from 'tocco-app-extensions'

export default (store, input) => {
  if (module.hot) {
    module.hot.accept('./route', () => {
      const reducers = require('./route').default.reducers
      appFactory.hotReloadReducers(store, reducers)
    })
  }

  return route.loadRoute(store, input, () => (import('./route')))
}
