import {combineReducers} from 'redux'
import {fork} from 'redux-saga/effects'
import moduleSagas from './sagas'

import data from './data'
import searchTerm from './searchTerm'
import ordering from './ordering'
import entityModel from './entityModel'

export default combineReducers({
  data,
  searchTerm,
  ordering,
  entityModel
})

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
