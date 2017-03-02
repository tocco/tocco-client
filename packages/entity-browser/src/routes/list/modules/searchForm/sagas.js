import {delay} from 'redux-saga'
import _isEmpty from 'lodash/isEmpty'
import {call, put, fork, select, takeLatest, take} from 'redux-saga/effects'

import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../../../util/api/forms'
import {combineEntitiesInObject, fetchEntities} from '../../../../util/api/entities'
import {INITIALIZED} from '../../../entity-browser/modules/actions'

export const searchFormSelector = state => state.searchForm
export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SET_SEARCH_INPUT, setSearchTerm),
    fork(takeLatest, actions.RESET, setSearchTerm)
  ]
}

export function* loadSearchForm(formDefinition, formBase) {
  if (formDefinition.length === 0) {
    formDefinition = yield call(fetchForm, formBase + '_search', searchFormTransformer)
    yield put(actions.setFormDefinition(formDefinition))
  }

  return formDefinition
}

export function* loadRelationEntities(relationEntities, formDefinition, entityModel) {
  if (_isEmpty(relationEntities)) {
    const relationEntities = yield formDefinition.filter(searchField => [
      'ch.tocco.nice2.model.form.components.simple.MultiSelectBox',
      'ch.tocco.nice2.model.form.components.simple.SingleSelectBox'].includes(searchField.type)).map(searchField => {
        const relationName = searchField.name
        const entityName = entityModel[relationName].targetEntity
        return call(fetchEntities, entityName)
      })

    const relationEntitiesTransformed = yield call(combineEntitiesInObject, relationEntities)

    yield put(actions.setRelationEntities(relationEntitiesTransformed))
  }
}

export function* getEntityModel() {
  let entityBrowser = yield select(entityBrowserSelector)
  if (!entityBrowser.initialized) {
    yield take(INITIALIZED)
  }

  entityBrowser = yield select(entityBrowserSelector)

  return entityBrowser.entityModel
}

export function* initialize() {
  let {formDefinition, relationEntities} = yield select(searchFormSelector)
  const {formBase} = yield select(entityBrowserSelector)
  const entityModel = yield call(getEntityModel)
  formDefinition = yield call(loadSearchForm, formDefinition, formBase)
  yield call(loadRelationEntities, relationEntities, formDefinition, entityModel)
}

export function* setSearchTerm() {
  yield call(delay, 400)
  const {searchValues} = yield select(searchFormSelector)
  yield put(actions.searchTermChange(searchValues))
}
