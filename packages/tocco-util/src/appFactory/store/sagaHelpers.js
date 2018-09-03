import errorLogging from '../../errorLogging'

import {call, put, all} from 'redux-saga/effects'

export const autoRestartSaga = generator => {
  return function* autoRestarting(...args) {
    while (true) {
      try {
        yield call(generator, ...args)
      } catch (error) {
        yield put(errorLogging.logError('client.common.unexpectedError', 'client.common.unexpectedError', error))
      }
    }
  }
}

export const createGenerator = sagas => {
  return function* rootSaga() {
    yield all(sagas)
  }
}
