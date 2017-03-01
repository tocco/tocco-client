import {put, fork, select, call, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import * as searchFormActions from '../../list/modules/searchForm/actions'
import {fetchModel} from '../../../util/api/entities'
import _isEmpty from 'lodash/isEmpty'
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
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, entityModel, formBase, showSearchForm, disableSimpleSearch, simpleSearchFields} = entityBrowser

  yield call(loadEntityModel, entityName, entityModel)

  if (showSearchForm) {
    yield put(searchFormActions.initialize(entityName, formBase, disableSimpleSearch, simpleSearchFields))
  }

  yield put(actions.initialized())
}
