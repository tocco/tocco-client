import {combineReducers} from 'redux'
import {fork} from 'redux-saga/effects'
import moduleSagas from './sagas'

import options from './options'

export default combineReducers({
  options
})

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
