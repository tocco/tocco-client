import {takeEvery} from 'redux-saga'
import {fork, select, put} from 'redux-saga/effects'
import {CHANGE_TARGET_ENTITY} from './actions'
import {selectSourceField, selectSourceRelation} from './selections/actions'

export const mergeMatrixSelector = state => state.mergeMatrix

export function* selectTargetEntityFields({payload}) {
  var pk = payload.pk
  var mergeMatrixState = yield select(mergeMatrixSelector)

  yield mergeMatrixState.model.fields.map(field => put(selectSourceField(field.name, pk)))

  yield mergeMatrixState.model.relations
    .filter(relation => !relation.toMany)
    .map(relation => put(selectSourceRelation(relation.name, pk)))
}

export default function* sagas() {
  yield [
    fork(takeEvery, CHANGE_TARGET_ENTITY, selectTargetEntityFields)
  ]
}
