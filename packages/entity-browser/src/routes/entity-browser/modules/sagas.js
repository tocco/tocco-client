import {put, fork, select, call, takeLatest} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'

import * as actions from './actions'
import {fetchModel} from '../../../util/api/entities'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize)
  ]
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const loadedModel = yield call(fetchModel, entityName)
    yield put(actions.setEntityModel(loadedModel))
  }
}

export function* initialize() {
  const {entityName, entityModel} = yield select(entityBrowserSelector)
  yield call(loadEntityModel, entityName, entityModel)
  yield put(actions.initialized())
}
