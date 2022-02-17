import {all, takeEvery, call, put, select} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'
import {v4 as uuid} from 'uuid'

import getNode from '../../utils/getNode'
import * as actions from './actions'

export const dialogSelector = state => state.docs.create.dialog
export const textResourceSelector = (state, key) => state.intl.messages[key]

const CREATED_STATUS = 201

export function* handleFilesSelected({payload: {location, files, isDirectory}}) {
  const blockingInfoId = yield call(uuid)
  yield put(
    notification.blockingInfo(
      blockingInfoId,
      isDirectory
        ? 'client.docs-browser.uploadInProgressDirectory'
        : files.length > 1
        ? 'client.docs-browser.uploadInProgressMultiple'
        : 'client.docs-browser.uploadInProgress',
      null
    )
  )

  const {onSuccess, onError} = yield select(dialogSelector)

  try {
    const response = yield call(createDocuments, location, files)

    if (response.status === 403) {
      yield put(notification.removeBlockingInfo(blockingInfoId))
      onError({
        title: yield select(textResourceSelector, 'client.entity-detail.saveAbortedTitle'),
        message: yield select(textResourceSelector, 'client.docs-browser.failedNoPermission')
      })
    } else {
      const remoteEvents = [
        {
          type: 'entity-create-event',
          payload: {
            entities: response.body.items
              .filter(item => item.status === CREATED_STATUS)
              .map(item => ({
                entityName: item.bean.model,
                key: item.bean.key
              }))
          }
        }
      ]

      yield put(notification.removeBlockingInfo(blockingInfoId))

      const msgId = isDirectory
        ? 'client.docs-browser.uploadSuccessfulDirectory'
        : 'client.docs-browser.uploadSuccessful'
      onSuccess({
        title: yield select(textResourceSelector, msgId),
        remoteEvents
      })
    }
  } catch (e) {
    consoleLogger.logError('Failed to upload files', e)
    yield put(notification.removeBlockingInfo(blockingInfoId))
    onError({
      title: yield select(textResourceSelector, 'client.docs-browser.uploadFailed')
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
    body: formData,
    acceptedStatusCodes: [403]
  }

  return yield call(rest.requestSaga, resource, options)
}

export default function* mainSagas() {
  yield all([takeEvery(actions.FILES_SELECTED, handleFilesSelected)])
}
