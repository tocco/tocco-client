import React from 'react'
import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'

import notification from '../../../notification'
import simpleFormConnector from '../../containers/simpleFormConnector'

export default function* initialFormHandler(preparationResponse, params, definition, selection, config) {
  if (preparationResponse.initialFormValues) {
    const formValues = yield call(handleInitialForm, preparationResponse.initialFormValues, config)

    return {
      abort: formValues === null,
      params: {formData: formValues}
    }
  }
  return {
    abort: false
  }
}

export const formValues = formValues => ({formValues})

export function* handleInitialForm({formDefinition, defaultValues, formTitle, formMessage}, config) {
  const answerChannel = yield call(channel)

  const id = new Date().valueOf()
  const onSend = ({values}) => answerChannel.put(formValues(values))
  const onCancel = () => answerChannel.put(formValues(null))
  const SimpleFormContainer = simpleFormConnector(config.formApp)
  yield put(
    notification.modal(id, formTitle, formMessage, () => (
      <SimpleFormContainer
        form={formDefinition.form}
        listApp={config.listApp}
        onSubmit={onSend}
        onCancel={onCancel}
        defaultValues={defaultValues}
        mode="create"
      />
    ))
  )

  const response = yield take(answerChannel)
  yield put(notification.removeModal(id))
  return response.formValues ? {model: formDefinition.model, paths: response.formValues} : null
}
