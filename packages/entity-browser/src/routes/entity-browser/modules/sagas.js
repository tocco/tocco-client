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

export function* setFormBaseToEntityNameIfEmpty(entityName, formBase) {
  if (formBase === '') {
    formBase = entityName
    yield put(actions.setFormBase(formBase))
  }

  return formBase
}

export function* initialize() {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, entityModel, formBase, showSearchForm, disableSimpleSearch, simpleSearchFields} = entityBrowser

  yield call(loadEntityModel, entityName, entityModel)

  const formBaseSet = yield call(setFormBaseToEntityNameIfEmpty, entityName, formBase)

  if (showSearchForm) {
    yield put(searchFormActions.initialize(entityName, formBaseSet, disableSimpleSearch, simpleSearchFields))
  }
}
