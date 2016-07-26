import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'


import list, { sagas as listSagas } from './list'
import searchTerm from './searchTerm'
import liveSearch from './liveSearch'
import ordering from './ordering'
import entityModel from './entityModel'

export default combineReducers({
  list,
  searchTerm,
  liveSearch,
  ordering,
  entityModel
})

export function* sagas() {
  yield [
    fork(listSagas)
  ]
}
