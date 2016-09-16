import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'
import mergeMatrix, { sagas as mergeMatrixSagas } from './../modules/mergeMatrix/'
import mergeStrategy from './../modules/mergeStrategy/'
import { sagas as wizardSagas } from './../modules/wizard/'
import input from './input/reducer'
import {intlReducer} from 'react-intl-redux'

export const reducers = (asyncReducers) => {
  return combineReducers({
    input,
    mergeMatrix,
    mergeStrategy,
    ...asyncReducers,
    intl: intlReducer
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers

export const sagas = function* rootSaga() {
  yield [
    fork(mergeMatrixSagas),
    fork(wizardSagas)
  ]
}
