import _isEmpty from 'lodash/isEmpty'
import {put, select, call, takeLatest, all} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize)
  ])
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const loadedModel = yield call(rest.fetchModel, entityName)
    yield put(actions.setEntityModel(loadedModel))
  }
}

export function* initialize() {
  const {entityModel, entityName, initialized} = yield select(entityListSelector)

  if (!initialized) {
    yield call(loadEntityModel, entityName, entityModel)
    yield put(actions.setInitialized())
  }
}
