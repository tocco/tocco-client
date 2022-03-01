import {fork, all} from 'redux-saga/effects'

import reducer from './reducer'
import moduleSagas from './sagas'

export function* sagas() {
  yield all([fork(moduleSagas)])
}

export default reducer
