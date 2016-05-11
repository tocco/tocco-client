import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import forms from '../modules/forms'
import entityModels from '../modules/entityModels'

export const reducers = (asyncReducers) => {
  return combineReducers({
    form,
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
