import {fork, all} from 'redux-saga/effects'

import reducer from './reducer'
import moduleSagas from './sagas'

export default reducer

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}
