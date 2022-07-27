import {channel} from 'redux-saga'
import {all, call, put, select, spawn, take, takeEvery} from 'redux-saga/effects'
import {api} from 'tocco-util'
import {v4 as uuid} from 'uuid'

import rest from '../../rest'
import * as valueActions from '../values/actions'
import notification from './../../notification'
import * as advancedSearchActions from './actions'
import {getAdvancedSearchComponent, getSelection, getValue} from './utils'

export const textResourceSelector = (state, key) => state.intl.messages[key] || key

export default function* sagas(config) {
  yield all([takeEvery(advancedSearchActions.OPEN_ADVANCED_SEARCH, openAdvancedSearch, config)])
}

export function* openAdvancedSearch(config, {payload}) {
  const {listApp} = config
  const {formName, formField, searchTerm, value} = payload

  const {
    id: fieldId,
    label,
    formBase: fieldFormBase,
    targetEntity: entity,
    dataType,
    formName: formNameField,
    constriction
  } = formField
  const multi = dataType === 'multi-remote-field'
  const remoteFieldFormName = formNameField ? `${entity}_${formNameField}` : fieldFormBase || entity
  const listFormDefinition = yield call(rest.fetchForm, remoteFieldFormName, 'remotefield')
  const answerChannel = yield call(channel)
  const modalId = yield call(uuid)
  const advancedSearchTitle = yield select(textResourceSelector, 'client.common.advancedSearch')
  const selection = yield call(getSelection, value, multi)

  const advancedSearchComponent = getAdvancedSearchComponent(
    listApp,
    entity,
    remoteFieldFormName,
    listFormDefinition,
    selection,
    ids => {
      answerChannel.put(advancedSearchActions.advancedSearchUpdate(ids))
    },
    () => {
      answerChannel.put(advancedSearchActions.advancedSearchClose())
    },
    fieldId,
    multi,
    constriction,
    searchTerm
  )

  yield put(notification.modal(modalId, `${label}: ${advancedSearchTitle}`, null, advancedSearchComponent, true))
  yield spawn(closeAdvancedSearch, answerChannel, modalId, fieldId, formName, entity, multi)
}

export function* enhanceEntitiesWithDisplays(entities) {
  const requestedDisplays = yield call(api.getDisplayRequest, entities)
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
          keys: payload.ids
        }
        let entities = yield call(rest.fetchEntities, entity, query)
        entities = yield call(enhanceEntitiesWithDisplays, entities)
        const value = yield call(getValue, entities, multi)
        yield call(advancedSearchUpdate, formName, fieldId, value)
      } else {
        yield call(advancedSearchUpdate, formName, fieldId, [])
      }
      if (!multi) {
        yield put(notification.removeModal(modalId))
        modalOpen = false
      }
    } else if (type === advancedSearchActions.ADVANCED_SEARCH_CLOSE) {
      yield put(notification.removeModal(modalId))
      modalOpen = false
    }
  }
}

export function* advancedSearchUpdate(formName, field, ids) {
  yield put(valueActions.changeFieldValue(formName, field, ids))
}
