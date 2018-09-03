import moduleSagas from './sagas'
import reducer from './reducer'

import {fork, all} from 'redux-saga/effects'

export default reducer

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}
