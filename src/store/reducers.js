import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import { fork } from 'redux-saga/effects';
import forms from '../modules/forms'
import entityModels, { sagas as entityModelSagas } from '../modules/entityModels'
import input from './input/reducer'

export const reducers = (asyncReducers) => {
  return combineReducers({
    form,
    router,
    forms,
    entityModels,
    input,
    ...asyncReducers })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers

export const sagas = function* rootSaga() {
  yield [
    fork(entityModelSagas)
  ]
}
