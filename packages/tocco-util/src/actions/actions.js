import reducer from './modules/reducer'
import appFactory from '../appFactory'
import sagas from './modules/sagas'
import componentTypes from './componentTypes'

export const isAction = componentType => !!componentType && Object.values(componentTypes).indexOf(componentType) >= 0

export const addToStore = (store, config) => {
  appFactory.injectReducers(store, {actions: reducer})
  store.sagaMiddleware.run(sagas, config)
}

export const modeFitsScopes = (mode, scopes) => (!mode || !scopes || scopes.length < 0 || scopes.includes(mode))
