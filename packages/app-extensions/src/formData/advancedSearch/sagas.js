import {channel} from 'redux-saga'
import _join from 'lodash/join'
import uuid from 'uuid/v4'
import {all, call, fork, put, takeEvery, take, spawn, select} from 'redux-saga/effects'

import notifier from './../../notifier'
import rest from '../../rest'
import * as advancedSearchActions from './actions'
import * as valueActions from '../values/actions'
import {getSelection, getValue, getAdvancedSearchComponent} from './utils'
import {entityListToDisplayRequest} from '../relationEntities/sagas'

export const textResourceSelector = (state, key) => state.intl.messages[key] || key

export default function* sagas(config) {
  yield all([
    fork(takeEvery, advancedSearchActions.OPEN_ADVANCED_SEARCH, openAdvancedSearch, config)
  ])
}

export function* openAdvancedSearch(config, {payload}) {
  const {listApp} = config
  const {formName, formField, modelField, value} = payload

  const {multi, targetEntity: entity} = modelField
  const {id: fieldId, label, formBase: fieldFormBase} = formField
  const formBase = fieldFormBase || entity
  const listFormDefinition = yield call(rest.fetchForm, `${formBase}_remotefield`)
  const answerChannel = yield call(channel)
  const modalId = yield call(uuid)
  const advancedSearchTitle = yield select(textResourceSelector, 'client.common.advancedSearch')
  const selection = yield call(getSelection, value, multi)

  const advancedSearchComponent = getAdvancedSearchComponent(
    listApp,
    entity,
    formBase,
    listFormDefinition,
    selection,
    ids => { answerChannel.put(advancedSearchActions.advancedSearchUpdate(ids)) },
    () => { answerChannel.put(advancedSearchActions.advancedSearchClose()) },
    fieldId,
    multi)

  yield put(notifier.modalComponent(modalId, `${label}: ${advancedSearchTitle}`, null, advancedSearchComponent, true))
  yield spawn(closeAdvancedSearch, answerChannel, modalId, fieldId, formName, entity, multi)
}

export function* enhanceEntitiesWithDisplays(entities) {
  const requestedDisplays = yield call(entityListToDisplayRequest, entities)
  const displays = yield call(rest.fetchDisplays, requestedDisplays)
  return entities.map(entity => ({...entity, display: displays[entity.model][entity.key]}))
}

export function* closeAdvancedSearch(answerChannel, modalId, fieldId, formName, entity, multi) {
  let modalOpen = true
  while (modalOpen) {
    const {payload, type} = yield take(answerChannel)
    if (type === advancedSearchActions.ADVANCED_SEARCH_UPDATE) {
      if (payload.ids && payload.ids.length > 0) {
        const query = {
          tql: `IN(pk,${_join(payload.ids, ',')})`
        }
        let entities = yield call(rest.fetchEntities, entity, query)
        entities = yield call(enhanceEntitiesWithDisplays, entities)
        const value = yield call(getValue, entities, multi)
        yield call(advancedSearchUpdate, formName, fieldId, value)
      } else {
        yield call(advancedSearchUpdate, formName, fieldId, [])
      }
      if (!multi) {
        yield put(notifier.removeModalComponent(modalId))
        modalOpen = false
      }
    } else if (type === advancedSearchActions.ADVANCED_SEARCH_CLOSE) {
      yield put(notifier.removeModalComponent(modalId))
      modalOpen = false
    }
  }
}

export function* advancedSearchUpdate(formName, field, ids) {
  yield put(valueActions.changeFieldValue(formName, field, ids))
}
