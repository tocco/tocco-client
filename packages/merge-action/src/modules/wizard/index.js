import {combineReducers} from 'redux'
import {fork} from 'redux-saga/effects'
import moduleSagas from './sagas'

export default combineReducers({

})

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
