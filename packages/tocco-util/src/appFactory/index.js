import {renderApp, reloadApp, createApp, registerAppInRegistry} from './appFactory'
import {createStore, injectReducers, injectSaga, hotReloadReducers} from './store/store'

export default {
  renderApp,
  reloadApp,
  createApp,
  createStore,
  registerAppInRegistry,
  injectReducers,
  injectSaga,
  hotReloadReducers
}
