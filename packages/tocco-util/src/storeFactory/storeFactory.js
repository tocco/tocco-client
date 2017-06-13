import {applyMiddleware, createStore as reduxCreateStore, combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import _difference from 'lodash/difference'
import _pick from 'lodash/pick'
import createSagaMiddleware from 'redux-saga'
import {fork} from 'redux-saga/effects'
import thunk from 'redux-thunk'

import {autoRestartSaga, createGenerator} from './sagaHelpers'

import input from './input/reducer'

export const createStore = (initialState = {}, reducers = {}, sagas = [], name = '') => {
  const sagaMiddleware = createSagaMiddleware()
  let middleware = applyMiddleware(thunk, sagaMiddleware)

  if (__DEBUG__) {
    const composeEnhancers = composeWithDevTools({
      name
    })
    middleware = composeEnhancers(middleware)
  }

  const allReducers = {
    ...reducers,
    input,
    intl: intlReducer
  }

  reducers = combineReducers(allReducers)
  const store = reduxCreateStore(reducers, initialState, middleware)

  store.allReducers = allReducers
  store.sagas = sagas
  store.sagaMiddleware = sagaMiddleware
  store.hotReloadReducers = hotReloadReducers

  const rootSaga = createGenerator(sagas.map(s => fork(s)))
  sagaMiddleware.run(autoRestartSaga(rootSaga))

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
    store.sagaMiddleware.run(autoRestartSaga(saga))
  }
}
