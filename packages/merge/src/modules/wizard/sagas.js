import {takeEvery} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import sendDwrRequest from '../../utils/Dwr'
import createMergeResult from '../../utils/MergeActionResult'
import {ExternalEvents} from 'tocco-util'
import {SAVE_MERGE, setMergeResponse} from './actions'
import {mergingWithoutProblems} from '../../utils/MergeResponse'

export function sendDwr(mergeActionResult) {
  if (__DEV__) {
    console.log('dev mode. would send dwr', mergeActionResult, JSON.stringify(mergeActionResult))
    return new Promise(resolve => {
      return resolve(require('../../dev_response.json'))
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
      yield call(ExternalEvents.invokeExternalEvent, 'close')
    } else {
      yield put(setMergeResponse(mergeResponse))
    }
  } catch (error) {
    console.log('An error occurred during merge:', error)
  }
}

export default function* sagas() {
  yield [
    fork(takeEvery, SAVE_MERGE, save)
  ]
}
