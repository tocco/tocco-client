import {combineReducers} from 'redux'
import {fork} from 'redux-saga/effects'
import moduleSagas from './sagas'

import editOptions from './editOptions'
import strategies from './strategies'

export default combineReducers({
  editOptions,
  strategies
})

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
