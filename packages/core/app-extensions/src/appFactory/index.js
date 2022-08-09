import {renderApp, reloadApp, createApp, registerAppInRegistry, createBundleableApp} from './appFactory'
import {setInput, inputChanged, INPUT_CHANGED, INPUT_INITIALIZED} from './store/input'
import {createStore} from './store/store'
import useApp, {getEvents} from './useApp'

export default {
  renderApp,
  reloadApp,
  createApp,
  createStore,
  registerAppInRegistry,
  createBundleableApp,
  useApp,
  getEvents,
  setInput,
  inputChanged,
  INPUT_CHANGED,
  INPUT_INITIALIZED
}
