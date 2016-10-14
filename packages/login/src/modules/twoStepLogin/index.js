import reducer from './reducer'
import moduleSagas from './sagas'
import {fork} from 'redux-saga/effects'

export default reducer

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
