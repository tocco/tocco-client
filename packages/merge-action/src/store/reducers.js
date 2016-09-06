import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects';
import mergeMatrix, { sagas as mergeMatrixSagas } from './../modules/MergeMatrix/'
import input from './input/reducer'

export const reducers = (asyncReducers) => {
  return combineReducers({
    input,
    mergeMatrix,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers

export const sagas = function* rootSaga() {
  yield [
    fork(mergeMatrixSagas)
  ]
}
