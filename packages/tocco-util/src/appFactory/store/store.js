import {applyMiddleware, createStore as reduxCreateStore, combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import _difference from 'lodash/difference'
import _pick from 'lodash/pick'
import createSagaMiddleware from 'redux-saga'
import {fork} from 'redux-saga/effects'
import thunk from 'redux-thunk'

import {autoRestartSaga, createGenerator} from './sagaHelpers'

import inputReducer from './input/reducer'

const getIntialState = input => {
  const initialState = window.__INITIAL_STATE__ || {}

  if (input) {
    initialState.input = input
  }
  return initialState
}

export const createStore = (reducers = {}, sagas = [], input, name = '') => {
  const initialState = getIntialState(input)
  const sagaMiddleware = createSagaMiddleware()
  let middleware = applyMiddleware(thunk, sagaMiddleware)

  if (__DEBUG__) {
    const composeEnhancers = composeWithDevTools({
      name,
      shouldHotReload: false
    })
    middleware = composeEnhancers(middleware)
  }

  const allReducers = {
    ...reducers,
    input: inputReducer,
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
  // workaround to support redux 4.0 and dev-tools: https://github.com/reduxjs/redux/issues/2943
  store.dispatch({type: 'replaceReducer'})
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
