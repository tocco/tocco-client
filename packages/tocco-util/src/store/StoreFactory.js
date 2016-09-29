import {applyMiddleware, compose, createStore, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {fork} from 'redux-saga/effects'
import thunk from 'redux-thunk'

import input from './input/reducer'

export default class StoreFactory {
  static createStore = (initialState = {}, reducers, sagas) => {
    var sagaMiddleware = createSagaMiddleware()
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

    const createGenerator = sagas => {
      return function* rootSaga() {
        yield sagas
      }
    }

    sagaMiddleware.run(createGenerator(sagas.map(s => fork(s))))
    return store
  }

  static hotReloadReducers = (store, reducers) => {
    reducers = combineReducers({...reducers, input})
    store.replaceReducer(reducers)
  }
}
