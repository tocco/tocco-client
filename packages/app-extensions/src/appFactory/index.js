import {
  renderApp,
  reloadApp,
  createApp,
  registerAppInRegistry,
  inputDispatchActionType
} from './appFactory'
import {createStore} from './store/store'
import useApp, {getEvent} from './useApp'

export default {
  renderApp,
  reloadApp,
  createApp,
  createStore,
  registerAppInRegistry,
  inputDispatchActionType,
  useApp,
  getEvent
}
