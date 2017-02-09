import {applyMiddleware, compose, createStore as reduxCreateStore, combineReducers} from 'redux'
import errorLogging, {sagas as loggingSagas, logError as logErrorAction} from '../errorLogging'
import createSagaMiddleware from 'redux-saga'
import {fork} from 'redux-saga/effects'
import thunk from 'redux-thunk'
import {autoRestartSaga, createGenerator} from './sagaHelpers'

import input from './input/reducer'

export const createStore = (initialState = {}, reducers, sagas) => {
  const sagaMiddleware = createSagaMiddleware()
  let middleware = applyMiddleware(thunk, sagaMiddleware)

  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  reducers = combineReducers({...reducers, input, errorLogging})
  const store = reduxCreateStore(reducers, initialState, middleware)

  store.asyncReducers = {}

  const rootSaga = createGenerator(sagas.map(s => fork(s)))

  sagaMiddleware.run(autoRestartSaga(rootSaga, logErrorAction))
  sagaMiddleware.run(loggingSagas, ['console', 'remote', 'toastr'])

  return store
}

export const hotReloadReducers = (store, reducers) => {
  reducers = combineReducers({...reducers, input})
  store.replaceReducer(reducers)
}
