import {all, takeEvery, call, put, select} from 'redux-saga/effects'
import {rest, notifier} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'
import {v4 as uuid} from 'uuid'

import getNode from '../../utils/getNode'
import * as actions from './actions'

export const dialogSelector = state => state.docs.create.dialog
export const textResourceSelector = (state, key) => state.intl.messages[key]

const CREATED_STATUS = 201

export function* handleFilesSelected({payload: {files, isDirectory}}) {
  const blockingInfoId = yield call(uuid)
  yield put(notifier.blockingInfo(
    blockingInfoId,
    isDirectory
      ? 'client.docs-browser.uploadInProgressDirectory'
      : files.length > 1
        ? 'client.docs-browser.uploadInProgressMultiple'
        : 'client.docs-browser.uploadInProgress',
    null
  ))

  const {location, onSuccess, onError} = yield select(dialogSelector)

  try {
    const response = yield call(createDocuments, location, files)

    const remoteEvents = [{
      type: 'entity-create-event',
      payload: {
        entities: response.body.items
          .filter(item => item.status === CREATED_STATUS)
          .map(item => ({
            entityName: item.bean.model,
            key: item.bean.key
          }))
      }
    }]

    yield put(notifier.removeBlockingInfo(blockingInfoId))

    const msgId = isDirectory ? 'client.docs-browser.uploadSuccessfulDirectory' : 'client.docs-browser.uploadSuccessful'
    onSuccess({
      message: yield select(textResourceSelector, msgId),
      remoteEvents
    })
  } catch (e) {
    consoleLogger.logError('Failed to upload files', e)
    yield put(notifier.removeBlockingInfo(blockingInfoId))
    onError({
      message: yield select(textResourceSelector, 'client.docs-browser.uploadFailed')
    })
  }
}

export function* createDocuments(location, files) {
  const node = getNode(location)

  if (!node) {
    return
  }

  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file)
  }

  const resource = `documents/${node.model}/${node.key}`
  const options = {
    method: 'POST',
    body: formData
  }

  return yield call(rest.requestSaga, resource, options)
}

export default function* mainSagas() {
  yield all([
    takeEvery(actions.FILES_SELECTED, handleFilesSelected)
  ])
}
