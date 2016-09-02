import { combineReducers } from 'redux'
import password from '../modules/password'

export const reducers = (asyncReducers) => {
  return combineReducers({
    password,
    ...asyncReducers })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers

export const sagas = function* rootSaga() {
  yield [
  ]
}
