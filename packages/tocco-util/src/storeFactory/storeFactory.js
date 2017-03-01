import {applyMiddleware, compose, createStore as reduxCreateStore, combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'
import _difference from 'lodash/difference'
import _pick from 'lodash/pick'
import createSagaMiddleware from 'redux-saga'
import {fork} from 'redux-saga/effects'
import thunk from 'redux-thunk'

import errorLogging, {sagas as loggingSagas, logError as logErrorAction} from '../errorLogging'
import {autoRestartSaga, createGenerator} from './sagaHelpers'

import input from './input/reducer'

const sagaMiddleware = createSagaMiddleware()

export const createStore = (initialState = {}, reducers = {}, sagas = []) => {
  let middleware = applyMiddleware(thunk, sagaMiddleware)

  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  const allReducers = {
    ...reducers,
    input,
    errorLogging,
    intl: intlReducer
  }

  reducers = combineReducers(allReducers)

  const store = reduxCreateStore(reducers, initialState, middleware)

  store.allReducers = allReducers
  store.sagas = sagas

  const rootSaga = createGenerator(sagas.map(s => fork(s)))

  sagaMiddleware.run(autoRestartSaga(rootSaga, logErrorAction))
  sagaMiddleware.run(loggingSagas, ['console', 'remote', 'toastr'])

  return store
}

export const hotReloadReducers = (store, reducers) => {
  const allReducers = {
    ...store.allReducers,
    ...reducers
  }
  const combinedReducers = combineReducers(allReducers)
  store.replaceReducer(combinedReducers)
  store.allReducers = allReducers
}

export const injectReducers = (store, reducers) => {
  const newKeys = _difference(Object.keys(reducers), Object.keys(store.allReducers))
  if (newKeys.length > 0) {
    const allReducers = {
      ...store.allReducers,
      ..._pick(reducers, newKeys)
    }
    hotReloadReducers(store, allReducers)
  }
}

export const injectSaga = (store, saga) => {
  if (!store.sagas.includes(saga)) {
    store.sagas.push(saga)
    sagaMiddleware.run(autoRestartSaga(saga, logErrorAction))
  }
}
