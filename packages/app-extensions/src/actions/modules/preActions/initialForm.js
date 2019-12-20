import React from 'react'
import {channel} from 'redux-saga'
import {call, put, take, all} from 'redux-saga/effects'

import notifier from '../../../notifier'
import rest from '../../../rest'
import simpleFormConnector from '../../containers/simpleFormConnector'

export const formValues = formValues => ({formValues})

const shouldRun = actionDefinition => !!actionDefinition.formDataEntityModel

export function* run(params, {formDataEntityModel, formDataTitle, formDataMessage}, selection, config) {
  const answerChannel = yield call(channel)

  const [model, form] = yield all([
    call(rest.fetchModel, formDataEntityModel),
    call(rest.fetchForm, formDataEntityModel, 'create')
  ])

  const id = new Date().valueOf()
  const onSend = ({values}) => answerChannel.put(formValues(values))
  const onCancel = () => answerChannel.put(formValues(null))
  const SimpleFormContainer = simpleFormConnector(config.formApp)
  yield put(notifier.modalComponent(id, formDataTitle, formDataMessage, () =>
    <SimpleFormContainer
      listApp={config.listApp}
      onSubmit={onSend}
      onCancel={onCancel}
      form={form}
      model={model}
    />
  ))

  const response = yield take(answerChannel)
  yield put(notifier.removeModalComponent(id))
  return {
    abort: response.formValues === null,
    ...(response.formValues ? {params: {formData: {model: formDataEntityModel, paths: response.formValues}}} : {})
  }
}

export default {shouldRun, run}
