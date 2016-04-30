import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import forms from '../modules/forms'
import entityModels from '../modules/entityModels'

export const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    forms,
    entityModels,
    ...asyncReducers })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
