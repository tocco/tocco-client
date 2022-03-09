import {renderApp, reloadApp, createApp, registerAppInRegistry, inputDispatchActionType} from './appFactory'
import {createStore} from './store/store'
import useApp, {getEvents} from './useApp'

export default {
  renderApp,
  reloadApp,
  createApp,
  createStore,
  registerAppInRegistry,
  inputDispatchActionType,
  useApp,
  getEvents
}
