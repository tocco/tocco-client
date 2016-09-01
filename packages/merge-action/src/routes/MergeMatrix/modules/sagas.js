import {takeEvery} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'

import {SAVE_MERGE} from './actions'
import {CHANGE_TARGET_ENTITY} from './actions'

import {selectSourceField, selectSourceRelation} from './selections/actions'

function createMergeResult(mergeMatrixState) {
  var result = {
    model: 'User',
    targetEntity: mergeMatrixState.targetEntityPk,
    data: mergeMatrixState.selections
  }

  return result
}

function sendDwr(mergeResult) {
  return new Promise((resolve) => {
    console.log('send dwr')
    console.log('nice2.netui.dwr.RemoteService.call', nice2.netui.dwr.RemoteService.call)

    nice2.netui.dwr.RemoteService.call({
      remoteService: 'nice2_entityoperation_MergeEntitiesService',
      method: 'getMergeConfig',
      args: [mergeResult],
      success: function(res) {
        resolve(res)
      }
    })
  })
}

function* save() {
  var mergeMatrixState = yield select(state => state.mergeMatrix)
  console.log('mergeMatrixState', mergeMatrixState)
  var result = createMergeResult(mergeMatrixState)

  if (__DEV__) {
    console.log('Would send drw:', result)
  } else {
    const result = yield call(sendDwr, result)
  }
}

function* selectTargetEntityFields({pk}) {
  var mergeMatrixState = yield select(state => state.mergeMatrix)

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
