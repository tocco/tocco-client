import {takeEvery} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import sendDrwRequest from '../../../utils/Dwr'
import createMergeResult from '../../../utils/MergeActionResult'
import {SAVE_MERGE} from './actions'
import {CHANGE_TARGET_ENTITY} from './actions'
import {selectSourceField, selectSourceRelation} from './selections/actions'

export const mergeMatrixSelector = state => state.mergeMatrix

function sendDwr(mergeActionResult) {
  if (__DEV__) {
    console.log('dev mode. would send dwr', mergeActionResult,JSON.stringify(mergeActionResult))
    return new Promise((resolve) => {
      return resolve()
    })
  } else {
    return sendDrwRequest('nice2_entityoperation_MergeEntitiesService')
  }
}

function* save() {
  var mergeMatrixState = yield select(mergeMatrixSelector)
  var mergeActionResult = createMergeResult(mergeMatrixState)
  var requestResult = yield call(sendDwr, mergeActionResult)
  console.log('requestResult', requestResult)
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
