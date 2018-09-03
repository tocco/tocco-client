import {channel} from 'redux-saga'
import _join from 'lodash/join'
import uuid from 'uuid/v4'

import notifier from './../../notifier'
import {fetchEntities} from '../../rest'
import * as advancedSearchActions from './actions'
import {getSelection, getValue, getAdvancedSearchComponent} from './utils'

import {all, call, fork, put, takeEvery, take, spawn, select} from 'redux-saga/effects'

export const textResourceSelector = (state, key) => state.intl.messages[key] || key

export default function* sagas() {
  yield all([
    fork(takeEvery, advancedSearchActions.OPEN_ADVANCED_SEARCH, openAdvancedSearch)
  ])
}

export function* openAdvancedSearch({payload}) {
  const {listApp, onSelect, formField, modelField, value} = payload
  const {multi, targetEntity: entity} = modelField
  const {id: fieldId, formBase = entity, label} = formField

  const answerChannel = yield call(channel)
  const modalId = yield call(uuid)
  const advancedSearchTitle = yield select(textResourceSelector, 'client.common.advancedSearch')
  const selection = yield call(getSelection, value, multi)

  const advancedSearchComponent = getAdvancedSearchComponent(
    listApp,
    entity,
    formBase,
    selection,
    ids => { answerChannel.put(advancedSearchActions.advancedSearchUpdate(ids)) },
    () => { answerChannel.put(advancedSearchActions.advancedSearchClose()) },
    fieldId,
    multi)

  yield put(notifier.modalComponent(modalId, `${label}: ${advancedSearchTitle}`, null, advancedSearchComponent, true))
  yield spawn(closeAdvancedSearch, answerChannel, modalId, fieldId, entity, onSelect, multi)
}

export function* closeAdvancedSearch(answerChannel, modalId, fieldId, entity, onSelect, multi) {
  let modalOpen = true
  while (modalOpen) {
    const {payload, type} = yield take(answerChannel)
    if (type === advancedSearchActions.ADVANCED_SEARCH_UPDATE) {
      if (payload.ids && payload.ids.length > 0) {
        const query = `IN(pk,${_join(payload.ids, ',')})`
        const entities = yield call(fetchEntities, entity, {query, fields: ''})
        const value = yield call(getValue, entities, multi)
        yield put(onSelect(fieldId, value))
      } else {
        yield put(onSelect(fieldId, []))
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
