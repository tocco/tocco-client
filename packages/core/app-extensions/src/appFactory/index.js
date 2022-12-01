import {renderApp, reloadApp, createApp, registerAppInRegistry, createBundleableApp} from './appFactory'
import {setInput, inputChanged, INPUT_CHANGED, INPUT_INITIALIZED} from './store/input'
import {createStore} from './store/store'
import {setThemeType} from './store/theme'
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
  setThemeType,
  INPUT_CHANGED,
  INPUT_INITIALIZED
}
