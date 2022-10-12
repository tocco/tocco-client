import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import {api} from 'tocco-util'

import notification from '../../../notification'
import simpleFormConnector from '../../containers/simpleFormConnector'

export default function* initialFormHandler({preparationResponse, config}) {
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

export const wrapFormValues = formValues => ({formValues})

export function* handleInitialForm({formDefinition, defaultValues, conditions, formTitle, formMessage}, config) {
  const answerChannel = yield call(channel)

  const id = new Date().valueOf()
  const onSend = ({values}) => answerChannel.put(wrapFormValues(values))
  const onCancel = () => answerChannel.put(wrapFormValues(null))
  const SimpleFormContainer = simpleFormConnector(config.formApp)
  const modifiedForm = addConditionsToFormDefinition(formDefinition.form, conditions)
  const modal = notification.modal(id, formTitle, formMessage, () => (
    <SimpleFormContainer
      form={modifiedForm}
      listApp={config.listApp}
      onSubmit={onSend}
      onCancel={onCancel}
      defaultValues={defaultValues}
      mode="create"
    />
  ))
  yield put(modal)

  const response = yield take(answerChannel)
  yield put(notification.removeModal(id))
  return response.formValues ? {model: formDefinition.model, paths: response.formValues} : null
}

export const addConditionsToFormDefinition = (formDefinition, conditions) => {
  if (!conditions || Object.keys(conditions).length === 0) {
    return formDefinition
  }

  return {
    ...formDefinition,
    ...(api.relationFieldTypes.includes(formDefinition.dataType) && conditions[formDefinition.id]
      ? {condition: conditions[formDefinition.id]}
      : {}),
    ...(formDefinition.children
      ? {children: formDefinition.children.map(c => addConditionsToFormDefinition(c, conditions))}
      : {})
  }
}
