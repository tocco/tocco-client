import {applyMiddleware, createStore as reduxCreateStore, combineReducers} from 'redux'
import {intlReducer} from 'react-intl-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import {reducer as reducerUtil, saga as sagaUtil} from 'tocco-util'
import {fork} from 'redux-saga/effects'

import inputReducer from './input/reducer'
import errorLogging from '../../errorLogging'

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
