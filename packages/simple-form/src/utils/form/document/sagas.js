import {actions as formActions} from 'redux-form'
import {errorLogging} from 'tocco-util'

import {uploadRequest, documentToFormValueTransformer} from './utils'

import {call, put} from 'redux-saga/effects'

const FORM_ID = 'simpleForm'

export function* uploadDocument({payload}) {
  const {file, field} = payload

  try {
    const uploadResponse = yield call(uploadRequest, file)
    if (uploadResponse.success) {
      const documentFormValue = yield call(documentToFormValueTransformer, uploadResponse, file)
      yield put(formActions.change(FORM_ID, field, documentFormValue))
    } else {
      throw new Error(`upload not successful: ${JSON.stringify(uploadResponse)}`)
    }
  } catch (error) {
    // timestamp is needed as workaround, so that Upload component rerenders
    yield put(formActions.change(FORM_ID, field, {id: null, timestamp: Date.now()}))
    yield put(errorLogging.logError(
      'client.component.form.uploadFailedTitle',
      'client.component.form.uploadFailedMessage',
      error
    ))
  }
}
