import {takeLatest, all, select, call, put} from 'redux-saga/effects'
import {externalEvents, rest} from 'tocco-app-extensions'
import _uniq from 'lodash/uniq'

import * as actions from './actions'

export const mergeSelector = state => state.merge

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.EXECUTE_MERGE, executeMerge),
    takeLatest(actions.CLOSE, close)
  ])
}

export function* initialize() {
  const {selection} = yield select(mergeSelector)
  yield call(loadSourceData, selection)
}

export function* loadSourceData(selection) {
  const resource = 'merge/sourceData'
  const options = {
    method: 'POST',
    body: selection
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
    selection: selection,
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
    acceptedStatusCodes: [400, 500],
    headers: {'X-Client-Questions': 'true'},
    body: yield call(getMergeBody)
  }

  const response = yield call(rest.requestSaga, resource, options)

  if (response.status === 200) {
    yield put(actions.setMergeResponse(response.body))
  } else {
    if (response.body && response.body.errorCode === 'VALIDATION_FAILED') {
      yield put(actions.setMergeError(null, response.body.errors))
    } else {
      yield put(actions.setMergeError(response.body.message, []))
    }
  }
}

export function* close() {
  const {sourceData} = yield select(mergeSelector)
  const entities = sourceData.entities.map(entitiy => ({entityName: entitiy.model, key: entitiy.key}))
  const remoteEvents = [{
    type: 'entity-update-event',
    payload: {
      entities
    }
  }]

  yield put(externalEvents.fireExternalEvent('onSuccess', {remoteEvents}))
}
