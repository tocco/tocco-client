import reducer from './modules/reducer'
import appFactory from '../appFactory'
import sagas from './modules/sagas'

export const COMPONENT_TYPE_ACTION = 'action'
export const COMPONENT_TYPE_ACTION_GROUP = 'action-group'

export const isAction = componentType =>
  !!componentType && (componentType === COMPONENT_TYPE_ACTION_GROUP || componentType === COMPONENT_TYPE_ACTION)

export const addToStore = (store, config) => {
  appFactory.injectReducers(store, {actions: reducer})
  store.sagaMiddleware.run(sagas, config)
}

export const modeFitsScopes = (mode, scopes) => (!mode || !scopes || scopes.length < 0 || scopes.includes(mode))
