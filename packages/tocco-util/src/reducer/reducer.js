import {combineReducers} from 'redux'
import _pick from 'lodash/pick'
import _difference from 'lodash/difference'

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
