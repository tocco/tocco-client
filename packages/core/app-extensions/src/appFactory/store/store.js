import {intlReducer} from 'react-intl-redux'
import {applyMiddleware, createStore as reduxCreateStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import {fork} from 'redux-saga/effects'
import thunk from 'redux-thunk'
import {reducer as reducerUtil, saga as sagaUtil} from 'tocco-util'

import errorLogging from '../../errorLogging'
import inputReducer from './input'
import themeReducer from './theme'

export const getInitialState = input => {
  const initialState = window.__INITIAL_STATE__ || {}

  if (input) {
    initialState.input = input
    initialState.intl = {
      locale: input.locale // make sure the desired locale is set right from the start (instead of default 'en')
    }
  }
  return initialState
}

export const createStore = (reducers = {}, sagas = [], input = {}, name = '') => {
  const initialState = getInitialState(input)
  const sagaMiddleware = createSagaMiddleware()
  let middleware = applyMiddleware(thunk, sagaMiddleware)

  if (__DEV__) {
    const composeEnhancers = composeWithDevTools({
      name,
      shouldHotReload: false
    })
    middleware = composeEnhancers(middleware)
  }

  const allReducers = {
    ...reducers,
    input: inputReducer,
    theme: themeReducer,
    intl: intlReducer
  }

  reducers = combineReducers(allReducers)
  const store = reduxCreateStore(reducers, initialState, middleware)

  store.allReducers = allReducers
  store.sagas = sagas
  store.sagaMiddleware = sagaMiddleware
  store.hotReloadReducers = reducerUtil.hotReloadReducers

  if (sagas && sagas.length > 0) {
    const rootSaga = sagaUtil.createGenerator(sagas.map(s => fork(s)))
    sagaMiddleware.run(sagaUtil.autoRestartSaga(rootSaga, null, errorLogging.logError))
  }

  return store
}
