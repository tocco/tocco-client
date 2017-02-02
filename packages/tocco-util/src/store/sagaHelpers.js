import {call, put} from 'redux-saga/effects'

export const autoRestartSaga = (generator, logError) => {
  return function* autoRestarting(...args) {
    while (true) {
      try {
        yield call(generator, ...args)
      } catch (error) {
        yield put(logError('Unhandled error in Saga', error))
      }
    }
  }
}

export const createGenerator = sagas => {
  return function* rootSaga() {
    yield sagas
  }
}
