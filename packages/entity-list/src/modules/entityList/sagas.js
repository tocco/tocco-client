import {put, fork, select, call, takeLatest, all} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'

import * as actions from './actions'
import {fetchModel} from '../../util/api/entities'

export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize)
  ])
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const loadedModel = yield call(fetchModel, entityName)
    yield put(actions.setEntityModel(loadedModel))
  }
}

export function* initialize() {
  const {entityModel, entityName} = yield select(entityListSelector)

  yield call(loadEntityModel, entityName, entityModel)
  yield put(actions.initialized())
}
