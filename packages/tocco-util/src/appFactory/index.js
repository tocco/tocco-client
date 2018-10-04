import {renderApp, reloadApp, createApp, registerAppInRegistry} from './appFactory'
import {createStore, injectReducers, injectSaga, hotReloadReducers} from './store/store'
import {autoRestartSaga} from './store/sagaHelpers'

export default {
  renderApp,
  reloadApp,
  createApp,
  createStore,
  registerAppInRegistry,
  injectReducers,
  injectSaga,
  hotReloadReducers,
  autoRestartSaga
}
