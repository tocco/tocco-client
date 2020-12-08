import {takeLatest, all, select, call, put} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

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

export function* loadSourceData(selection) {
  const resource = 'nice2/rest/merge/sourceData'
  const options = {
    method: 'POST',
    body: {
      selection
    }
  }
  const response = yield call(rest.requestSaga, resource, options)
  const {body: sourceData} = response
  yield put(actions.setSourceData(sourceData))
  yield put(actions.setTargetEntity(sourceData.entities[0].key))
}

export function* executeMerge() {
  const {selection, selected, sourceData} = yield select(mergeSelector)

  const paths = {}
  for (const [name, entityKey] of Object.entries(selected.single)) {
    const path = sourceData.entities.find(e => e.key === entityKey).paths[name]
    if (path.type === 'entity') {
      paths[name] = {
        key: path.value.key
      }
    } else {
      paths[name] = path.value
    }
  }

  for (const [name, obj] of Object.entries(selected.multiple)) {
    paths[name] = []
    Object.keys(obj).forEach(value => paths[name].push({
      key: value
    }))
  }

  const mergeRelations = []
  sourceData.relations.forEach(relation => {
    const isSelected = selected.multipleAll[relation.relationName].includes(relation.entityKey)
    if (isSelected || relation.entityKey === selected.targetEntity) {
      mergeRelations.push({
        relationName: relation.relationName,
        sourceKey: relation.entityKey,
        selected: isSelected
      })
    }
  })

  const resource = 'nice2/rest/merge/merge'
  const options = {
    method: 'POST',
    body: {
      selection: selection,
      targetEntity: {
        key: selected.targetEntity,
        paths: paths
      },
      mergeRelations: mergeRelations
    }
  }

  const response = yield call(rest.requestSaga, resource, options)

  yield put(actions.setMergeResponse(response))
}
