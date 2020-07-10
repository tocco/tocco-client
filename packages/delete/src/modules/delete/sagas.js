import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest, externalEvents} from 'tocco-app-extensions'
import {selection as selectionUtil} from 'tocco-util'

import * as actions from './actions'
import deleteRequestParser from '../../utils/deleteRequestParser'

export const inputSelector = state => state.input
export const textResourceSelector = state => state.intl.messages

export function* getDeleteBodyFromSelection() {
  const {selection} = yield select(inputSelector)
  const entities = yield call(selectionUtil.getEntities, selection, rest.fetchEntities)

  return {
    entityModel: entities.entityName,
    keys: entities.keys
  }
}

const deleteDialogResource = 'client/delete/dialog'

export function* loadDialogInfo() {
  const body = yield call(getDeleteBodyFromSelection)

  const [deleteResponse, principal] = yield all([
    call(rest.requestSaga, deleteDialogResource, {method: 'POST', body}),
    call(rest.fetchPrincipal)
  ])

  const res = deleteRequestParser(deleteResponse.body, principal.currentBusinessUnit.id)
  yield put(actions.setDeleteDialogInfo(res))
}

const deleteResource = 'client/delete'

export function* doDelete() {
  yield put(actions.setDeletingInProgress(true))
  const body = yield call(getDeleteBodyFromSelection)

  const response = yield call(rest.requestSaga, deleteResource, {method: 'POST', body})

  const textResources = yield select(textResourceSelector)
  if (response.ok) {
    const {body} = response

    const entities = Object.keys(body.deletedEntities).reduce((acc, entityName) => {
      return [
        ...acc,
        ...body.deletedEntities[entityName].map(key => ({entityName, key}))
      ]
    }, [])

    const remoteEvents = [{
      type: 'entity-delete-event',
      payload: {
        entities
      }
    }]

    yield put(externalEvents.fireExternalEvent('onSuccess', {
      message: textResources['client.delete.successfullyMessage'],
      remoteEvents
    }))
  } else {
    yield put(externalEvents.fireExternalEvent('onError', {message: textResources['client.delete.errorMessage']}))
  }
}

export function* onCancel() {
  yield put(externalEvents.fireExternalEvent('onCancel'))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_DIALOG_INFO, loadDialogInfo),
    takeLatest(actions.DO_DELETE, doDelete),
    takeLatest(actions.ON_CANCEL, onCancel)
  ])
}
