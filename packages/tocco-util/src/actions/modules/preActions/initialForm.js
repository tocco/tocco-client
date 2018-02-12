import React from 'react'
import {call, put, take, all} from 'redux-saga/effects'
import {channel} from 'redux-saga'
import notifier from '../../../notifier'
import {fetchForm, fetchModel} from '../../../rest'
import SimpleFormApp from 'tocco-simple-form/src/main'

export const formValues = formValues => ({formValues})

const shouldRun = actionDefinition => !!actionDefinition.formDataEntityModel

export function* run(params, definition, ids) {
  const entity = definition.formDataEntityModel

  const answerChannel = yield call(channel)

  const [model, form] = yield all([
    call(fetchModel, entity),
    call(fetchForm, `${entity}_detail`)
  ])

  const id = new Date().valueOf()
  const onSend = values => answerChannel.put(formValues(values))
  const onCancel = () => answerChannel.put(formValues(null))

  yield put(notifier.modalComponent(id, '', '', () => (
    <SimpleFormApp
      onSubmit={onSend}
      onCancel={onCancel}
      form={form}
      model={model}
    />)))

  const response = yield take(answerChannel)
  yield put(notifier.removeModalComponent(id))
  return {
    abort: response.formValues === null,
    ...(response.formValues ? {params: {formData: {model: entity, paths: response.formValues}}} : {})
  }
}

export default {shouldRun, run}
