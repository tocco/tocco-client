import {takeLatest, all, select, call, put} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import _uniq from 'lodash/uniq'

import * as actions from './actions'

export const mergeSelector = state => state.merge

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.EXECUTE_MERGE, executeMerge)
  ])
}

export function* initialize() {
  const {selection} = yield select(mergeSelector)
  yield call(loadSourceData, selection)
}

export function* getSelection(selection) {
  return {
    model: selection.entityName,
    keys: selection.ids
  }
}

export function* loadSourceData(selection) {
  const resource = 'merge/sourceData'
  const options = {
    method: 'POST',
    body: yield call(getSelection, selection)
  }
  const response = yield call(rest.requestSaga, resource, options)
  const {body: sourceData} = response
  yield put(actions.setSourceData(sourceData))
  yield put(actions.setTargetEntity(sourceData.entities[0].key))
}

export function* getMergeBody() {
  const {selection, selected, sourceData} = yield select(mergeSelector)

  const paths = {}
  for (const [name, entityKey] of Object.entries(selected.single)) {
    const path = sourceData.entities.find(e => e.key === entityKey).paths[name]

    if (path.writable) {
      if (path.type === 'entity') {
        if (path.value === null) {
          paths[name] = null
        } else {
          paths[name] = {
            key: path.value.key
          }
        }
      } else {
        paths[name] = entityKey
      }
    }
  }

  for (const [name, obj] of Object.entries(selected.multiple)) {
    paths[name] = []
    Object.keys(obj).forEach(value => paths[name].push({
      key: value
    }))
  }

  const mergeRelations = _uniq(sourceData.relations.map(r => r.relationName)).map(relationName => ({
    relationName: relationName,
    sourceKey: selected.multipleAll[relationName] || []
  }))

  return {
    selection: yield call(getSelection, selection),
    targetEntity: {
      key: selected.targetEntity,
      paths: paths
    },
    mergeRelations: mergeRelations
  }
}

export function* executeMerge() {
  const resource = 'merge/merge'
  const options = {
    method: 'POST',
    body: yield call(getMergeBody)
  }

  const response = yield call(rest.requestSaga, resource, options)
  yield put(actions.setMergeResponse(response.body))
}
