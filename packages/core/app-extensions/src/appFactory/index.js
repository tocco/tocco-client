import {
  renderApp,
  reloadApp,
  createApp,
  registerAppInRegistry,
  createBundleableApp,
  inputDispatchActionType
} from './appFactory'
import {createStore} from './store/store'
import useApp, {getEvents} from './useApp'

export default {
  renderApp,
  reloadApp,
  createApp,
  createStore,
  registerAppInRegistry,
  createBundleableApp,
  inputDispatchActionType,
  useApp,
  getEvents
}
