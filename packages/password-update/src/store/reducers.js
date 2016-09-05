import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects';
import input from './input/reducer'
import validationRules, { sagas as validationRulesSagas } from '../modules/validationRules'
import password, { sagas as passwordSagas } from '../modules/password'

export const reducers = (asyncReducers) => {
  return combineReducers({
    input,
    password,
    validationRules,
    ...asyncReducers })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers

export const sagas = function* rootSaga() {
  yield [
    fork(validationRulesSagas),
    fork(passwordSagas)
  ]
}
