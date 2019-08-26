import {consoleLogger} from 'tocco-util'
import {externalEvents} from 'tocco-app-extensions'
import {takeEvery, call, fork, select, put, all} from 'redux-saga/effects'

import sendDwrRequest from '../../utils/Dwr'
import createMergeResult from '../../utils/MergeActionResult'
import {SAVE_MERGE, setMergeResponse} from './actions'
import {mergingWithoutProblems} from '../../utils/MergeResponse'

export function sendDwr(mergeActionResult) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('dev mode. would send dwr', mergeActionResult, JSON.stringify(mergeActionResult))
    return new Promise(resolve => {
      return resolve(require('../../dev/response.json'))
    })
  } else {
    return sendDwrRequest('nice2_entityoperation_MergeEntitiesService', 'merge', mergeActionResult)
  }
}

export function* save() {
  try {
    const state = yield select()
    const mergeActionResult = yield call(createMergeResult, state)
    const mergeResponse = yield call(sendDwr, mergeActionResult)

    if (mergingWithoutProblems(mergeResponse)) {
      yield put(externalEvents.fireExternalEvent('close'))
    } else {
      yield put(setMergeResponse(mergeResponse))
    }
  } catch (error) {
    consoleLogger.logError('An error occurred during merge:', error)
  }
}

export default function* sagas() {
  yield all([
    fork(takeEvery, SAVE_MERGE, save)
  ])
}
