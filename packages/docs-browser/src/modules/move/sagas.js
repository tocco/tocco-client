import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {notifier, rest} from 'tocco-app-extensions'
import {validation} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.docs.move.input
export const textResourceSelector = (state, key) => state.intl.messages[key]

export function* moveElements({payload}) {
  const resource = 'documents/move'
  const options = {
    method: 'POST',
    acceptedStatusCodes: [400, 403],
    body: {
      targetEntityKey: payload.target,
      selectedEntityKeys: payload.selected
    }
  }

  yield put(actions.setWaiting(true))
  const response = yield call(rest.requestSaga, resource, options)

  if (response.status === 204) {
    yield call(setDone)
  } else {
    yield put(actions.setWaiting(false))
    let message = 'client.actions.dms-move.failed.message'
    if (response.body?.errorCode === 'VALIDATION_FAILED') {
      message = validation.getErrorCompact(response.body.errors)
    }
    if (response.status === 403) {
      message = 'client.docs-browser.failedNoPermission'
    }
    yield put(notifier.info('error', 'client.actions.dms-move.failed.title', message))
  }
}

export function* setDone() {
  const {selection, onSuccess} = yield select(inputSelector)

  const remoteEvents = [{
    type: 'entity-update-event',
    payload: {
      entities: selection.ids.map(id => ({
        entityName: 'Docs_list_item',
        key: id
      }))
    }
  }]

  onSuccess({
    title: yield select(textResourceSelector, 'client.docs-browser.moveSuccessful'),
    remoteEvents
  })

  yield put(actions.close())
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.MOVE_ELEMENTS, moveElements)
  ])
}
