import {call, put, fork, select, takeLatest, all} from 'redux-saga/effects'

import * as actions from './actions'
import {fetchModel} from '../../../util/api/entities'
import parseUrl from '../../../util/parseUrl'
import doShowBackButton from '../../../util/showBackButton'
import detail from '../../../util/detail'

export const entityBrowserSelector = state => state.entityBrowser
export const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.LOAD_DETAIL_PARAMS, loadEntityDetail),
    fork(takeLatest, actions.CLEAR_DETAIL_PARAMS, clearDetailParams)
  ])
}

export function* clearDetailParams() {
  yield put(actions.setDetailParams(undefined))
}

export function* loadEntityDetail({payload}) {
  const {modelPaths, entityId, parentUrl} = yield call(parseUrl, payload.url)
  const {entityName, formBase} = yield select(entityBrowserSelector)

  const mode = yield call(detail.getMode, entityId)

  let targetEntityName = entityName
  let formName = formBase

  if (modelPaths && modelPaths.length > 0) {
    targetEntityName = yield call(getTargetEntity, entityName, modelPaths)
    formName = `${formBase}_${targetEntityName}`
  }

  const {initialKey} = yield select(inputSelector)
  const showBackButton = yield call(doShowBackButton, initialKey, modelPaths)

  const detailParams = {
    mode,
    entityId,
    entityName: targetEntityName,
    formName,
    parentUrl,
    showBackButton
  }

  yield put(actions.setDetailParams(detailParams))
}

export function* getTargetEntity(entityName, modelPaths) {
  let targetEntityName = entityName
  let model = yield call(fetchModel, targetEntityName)

  for (let i = 0; i < modelPaths.length; i++) {
    const path = modelPaths[i]
    const relation = model[path]

    if (!relation) {
      throw new Error(`No such path '${path}' found on entity model '${targetEntityName}'`)
    }
    targetEntityName = relation.targetEntity

    if (i + 1 < modelPaths.length) {
      model = yield call(fetchModel, targetEntityName)
    }
  }

  return targetEntityName
}
