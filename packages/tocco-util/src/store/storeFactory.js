import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import thunk from 'redux-thunk'

import input from './input/reducer'

const sagaMiddleware = createSagaMiddleware()

export default (initialState = {}, reducers, sagas) => {
  let middleware = applyMiddleware(thunk, sagaMiddleware)

  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  reducers = combineReducers({...reducers, input})
  const store = createStore(reducers, initialState, middleware)

  store.asyncReducers = {}

  sagaMiddleware.run(createGenerator(sagas.map(s => fork(s))))
  return store
}

// export const injectReducer = (store, { key, reducer }) => {
//   store.asyncReducers[key] = reducer
//   store.replaceReducer(reducers(reducerObj))
// }

export const hotReloadReducers = (store, reducers) => {
  reducers = combineReducers({...reducers, input})
  store.replaceReducer(reducers)
}

const createGenerator = (sagas) => {
  return function* rootSaga() {
    yield sagas
  }
}
