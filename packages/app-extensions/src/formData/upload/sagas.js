import {actions as formActions} from 'redux-form'
import {all, call, put, takeEvery} from 'redux-saga/effects'

import {documentToFormValueTransformer, uploadRequest} from './documents'
import * as actions from './actions'
import errorLogging from '../../errorLogging'
import form from '../../form'
import rest from '../../rest'

export default function* sagas() {
  yield all([
    takeEvery(actions.UPLOAD_DOCUMENT, uploadDocument),
    takeEvery(actions.SET_DOCUMENT, setDocument)
  ])
}

export function* uploadDocument({payload}) {
  const {formName, file, field} = payload

  try {
    const uploadResponse = yield call(uploadRequest, file)

    if (uploadResponse.success) {
      const documentFormValue = yield call(documentToFormValueTransformer, uploadResponse, file)
      yield put(formActions.change(formName, form.transformFieldName(field), documentFormValue))
    } else {
      throw new Error(`upload not successful: ${JSON.stringify(uploadResponse)}`)
    }
  } catch (error) {
    // timestamp is needed as workaround, so that Upload component rerenders
    yield put(formActions.change(formName, field, {id: null, timestamp: Date.now()}))
    yield put(errorLogging.logError(
      'client.component.form.uploadFailedTitle',
      'client.component.form.uploadFailedMessage',
      error
    ))
  }
}

export function* setDocument({payload}) {
  const {formName, field, resourceId} = payload
  const resource = yield call(rest.fetchEntity, 'Resource', resourceId, {paths: ['relContent.data']})
  const documentFormValue = {...resource.paths.relContent.value.paths.data.value, resourceKey: resourceId}
  yield put(formActions.change(formName, form.transformFieldName(field), documentFormValue))
}
