import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest, externalEvents, selection as selectionUtil} from 'tocco-app-extensions'

import {getDialogInfo, getEntitiesToDelete} from '../../utils/deleteRequestParser'
import * as actions from './actions'

export const inputSelector = state => state.input
export const textResourceSelector = state => state.intl.messages
export const entitiesToDeleteSelector = state => state.del.entitiesToDelete

export function* getDeleteBodyFromSelection() {
  const {selection} = yield select(inputSelector)

  const entities = yield call(selectionUtil.getEntities, selection, rest.fetchEntities)

  return {
    entityModel: entities.entityName,
    keys: entities.keys
  }
}

export function* getDeleteEndpoint() {
  const {customDeleteEndpoint} = yield select(inputSelector)
  return customDeleteEndpoint || 'client/delete'
}

export function* loadDialogInfo() {
  const body = yield call(getDeleteBodyFromSelection)
  const deleteEndpoint = yield call(getDeleteEndpoint)

  const [deleteResponse, principal] = yield all([
    call(rest.requestSaga, `${deleteEndpoint}/dialog`, {method: 'POST', body}),
    call(rest.fetchPrincipal)
  ])

  const dialogInfo = yield call(getDialogInfo, deleteResponse.body, principal.currentBusinessUnit.id)
  yield put(actions.setDeleteDialogInfo(dialogInfo))

  const entitiesToDelete = yield call(getEntitiesToDelete, deleteResponse.body)
  yield put(actions.setEntitiesToDelete(entitiesToDelete))
}

export function* doDelete() {
  const entitiesToDelete = yield select(entitiesToDeleteSelector)

  yield put(actions.setDeletingInProgress(true))
  const deleteEndpoint = yield call(getDeleteEndpoint)

  const response = yield call(rest.requestSaga, deleteEndpoint, {
    method: 'POST',
    body: {
      entityModel: entitiesToDelete.entityName,
      keys: entitiesToDelete.keys
    },
    acceptedStatusCodes: [409]
  })

  const textResources = yield select(textResourceSelector)
  if (response.ok) {
    const {body} = response

    const entities = Object.keys(body.deletedEntities).reduce((acc, entityName) => {
      return [...acc, ...body.deletedEntities[entityName].map(key => ({entityName, key}))]
    }, [])

    const remoteEvents = [
      {
        type: 'entity-delete-event',
        payload: {
          entities
        }
      }
    ]

    yield put(
      externalEvents.fireExternalEvent('onSuccess', {
        message: textResources['client.delete.successfullyMessage'],
        remoteEvents
      })
    )
  } else {
    if (response.status === 409 && response.body.information) {
      yield put(externalEvents.fireExternalEvent('onError', {message: response.body.information}))
    } else {
      yield put(externalEvents.fireExternalEvent('onError', {message: textResources['client.delete.errorMessage']}))
    }
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
