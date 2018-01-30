import {call, put} from 'redux-saga/effects'
import {uploadRequest, documentToFormValueTransformer} from './utils'
import {change as changeFormValue} from 'redux-form'
import {errorLogging} from 'tocco-util'

const FORM_ID = 'simpleForm'

export function* uploadDocument({payload}) {
  const {file, field} = payload

  try {
    const uploadResponse = yield call(uploadRequest, file)
    if (uploadResponse.success) {
      const documentFormValue = yield call(documentToFormValueTransformer, uploadResponse, file)
      yield put(changeFormValue(FORM_ID, field, documentFormValue))
    } else {
      throw new Error(`upload not successful: ${JSON.stringify(uploadResponse)}`)
    }
  } catch (error) {
    // timestamp is needed as workaround, so that Upload component rerenders
    yield put(changeFormValue(FORM_ID, field, {id: null, timestamp: Date.now()}))
    yield put(errorLogging.logError(
      'client.component.form.uploadFailedTitle',
      'client.component.form.uploadFailedMessage',
      error
    ))
  }
}
