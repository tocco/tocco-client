import reducer from './modules/reducer'
import appFactory from '../appFactory'
import sagas from './modules/sagas'

export const ACTION_NAMESPACE = 'ch.tocco.nice2.model.form.components.action'
export const OLD_ACTION_TYPE = `${ACTION_NAMESPACE}.Action`
export const ACTION_GROUP_TYPE = `${ACTION_NAMESPACE}.ActionGroup`

export const isAction = type => !!type && type.startsWith(ACTION_NAMESPACE)

export const getTypeName = fullType => fullType.split('.').pop()

export const addToStore = (store, config) => {
  appFactory.injectReducers(store, {actions: reducer})
  store.sagaMiddleware.run(sagas, config)
}

export const modeFitsScopes = (mode, scopes) => (!mode || !scopes || scopes.length < 0 || scopes.includes(mode))
