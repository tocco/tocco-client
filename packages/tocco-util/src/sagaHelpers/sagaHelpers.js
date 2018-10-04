import {delay} from 'redux-saga'

import {requestSaga} from '../rest'

import {call} from 'redux-saga/effects'

export function* checkStatusLoop(location, retryStatus) {
  let delayer = 1
  while (true) {
    const response = yield call(requestSaga, location)
    if (response.body.status === retryStatus) {
      yield delay(500 * delayer)
      if (delayer < 10) delayer++
    } else {
      return response
    }
  }
}
