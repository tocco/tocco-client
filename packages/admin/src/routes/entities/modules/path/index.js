import moduleSagas from './sagas'
import reducer from './reducer'

import {fork, all} from 'redux-saga/effects'

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}

export default reducer
