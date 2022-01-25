import {fork, all} from 'redux-saga/effects'

import moduleSagas from './sagas'
import reducer from './reducer'

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}

export default reducer
