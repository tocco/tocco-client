import {takeEvery} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import sendDwrRequest from '../../utils/Dwr'
import createMergeResult from '../../utils/MergeActionResult'
import invokeExternalEvent from '../../utils/ExternalEvents'
import {SAVE_MERGE, CHANGE_TARGET_ENTITY} from './actions'
import {selectSourceField, selectSourceRelation} from './selections/actions'

export const mergeMatrixSelector = state => state.mergeMatrix

export function sendDwr(mergeActionResult) {
  if (__DEV__) {
    console.log('dev mode. would send dwr', mergeActionResult, JSON.stringify(mergeActionResult))
    return new Promise((resolve) => {
      return resolve()
    })
  } else {
    return sendDwrRequest('nice2_entityoperation_MergeEntitiesService', 'merge', mergeActionResult)
  }
}

export function* save() {
  var mergeMatrixState = yield select(mergeMatrixSelector)
  var mergeActionResult = yield call(createMergeResult, mergeMatrixState)
  yield call(sendDwr, mergeActionResult)
  yield call(invokeExternalEvent, 'close')
}

export function* selectTargetEntityFields({pk}) {
  var mergeMatrixState = yield select(mergeMatrixSelector)

  yield mergeMatrixState.model.fields.map(field => put(selectSourceField(field.name, pk)))

  yield mergeMatrixState.model.relations
    .filter(relation => !relation.toMany)
    .map(relation => put(selectSourceRelation(relation.name, pk)))
}

export default function* sagas() {
  yield [
    fork(takeEvery, SAVE_MERGE, save),
    fork(takeEvery, CHANGE_TARGET_ENTITY, selectTargetEntityFields)
  ]
}
