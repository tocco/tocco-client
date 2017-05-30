import {call, put, fork, select, takeLatest, all} from 'redux-saga/effects'
import * as actions from './actions'
import {fetchModel} from '../../../util/api/entities'
import parseUrl from '../../../util/parseUrl'
import showBackButton from '../../../util/showBackButton'

const entityBrowserSelector = state => state.entityBrowser
const inputSelector = state => state.input

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
  const {modelPaths, entityId, parentUrl} = parseUrl(payload.url)
  const {entityName, formBase} = yield select(entityBrowserSelector)

  let targetEntityName = entityName
  let formNameExtension = ''

  if (modelPaths && modelPaths.length > 0) {
    let model = yield call(fetchModel, targetEntityName)

    for (const path of modelPaths) {
      const relation = model[path]
      if (!relation) {
        throw new Error(`No such path '${path}' found on entity model '${targetEntityName}'`)
      }
      targetEntityName = relation.targetEntity
      formNameExtension = `_${targetEntityName}`
      model = yield call(fetchModel, targetEntityName)
    }
  }

  const formName = `${formBase}${formNameExtension}_detail`

  const {initialKey} = yield select(inputSelector)

  const detailParams = {
    entityId,
    entityName: targetEntityName,
    formName,
    parentUrl,
    showBackButton:  showBackButton(initialKey, modelPaths)
  }

  yield put(actions.setDetailParams(detailParams))
}
