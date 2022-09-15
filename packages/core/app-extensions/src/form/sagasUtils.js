import {
  actions as formActions,
  getFormAsyncErrors,
  getFormSubmitErrors,
  getFormSyncErrors,
  getFormValues
} from 'redux-form'
import {SubmissionError} from 'redux-form/es/SubmissionError'
import {call, put, select} from 'redux-saga/effects'
import {api} from 'tocco-util'

import errorLogging from '../errorLogging'
import notification from '../notification'
import rest from '../rest'
import {ErrorItem} from './ErrorItem'
import {getFieldId} from './formDefinition'
import formErrorUtils from './formErrors'
import {formValuesToFlattenEntity, getDirtyFormValues, transformFieldName} from './reduxForm'

export const formInitialValueSelector = (state, formId) => state.form[formId].initial

export function focusField({formId}, fieldName) {
  const element = document.getElementById(getFieldId(formId, fieldName))
  if (element) {
    element.focus()
    return true
  }

  return false
}

export function* getFormErrors({formId}) {
  return {
    ...(yield select(getFormSyncErrors(formId))),
    ...(yield select(getFormAsyncErrors(formId))),
    ...(yield select(getFormSubmitErrors(formId)))
  }
}

export function* focusErrorField(formConfig) {
  const formErrors = yield call(getFormErrors, formConfig)
  const firstErrorField = yield call(formErrorUtils.getFirstErrorField, formErrors)
  if (firstErrorField) {
    yield call(focusField, formConfig, firstErrorField)
  }
}

export function* touchAllFields(formConfig) {
  const {formId, stateSelector} = formConfig
  const {fieldDefinitions} = yield select(stateSelector)
  yield put(formActions.touch(formId, ...fieldDefinitions.map(f => transformFieldName(f.path || f.id))))
}

export function* handleInvalidForm(formConfig) {
  yield call(touchAllFields, formConfig)
  yield call(focusErrorField, formConfig)
}

export function* getCurrentEntityState(formConfig) {
  const {formId, stateSelector} = formConfig
  const formValues = yield select(getFormValues(formId))
  const initialFormValues = yield select(formInitialValueSelector, formId)
  const {mode, fieldDefinitions, formDefinition} = yield select(stateSelector)
  const initialValues = mode === 'create' ? {} : initialFormValues
  const dirtyFormValues = yield call(getDirtyFormValues, initialValues, formValues, mode === 'create')

  return {
    formValues,
    initialValues,
    mode,
    fieldDefinitions,
    formDefinition,
    dirtyFormValues
  }
}

export function* getEntityForSubmit(formConfig) {
  const {dirtyFormValues, fieldDefinitions} = yield call(getCurrentEntityState, formConfig)
  const flattenEntity = yield call(formValuesToFlattenEntity, dirtyFormValues, fieldDefinitions)
  return yield call(api.toEntity, flattenEntity)
}

export function* handleSubmitError(formConfig, error) {
  const {formId} = formConfig
  if (error instanceof SubmissionError) {
    yield put(formActions.stopSubmit(formId, error.errors))
    yield call(handleInvalidForm, formConfig)

    const validationErrors = yield call(formErrorUtils.getValidatorErrors, error.errors)
    const body =
      validationErrors && validationErrors.length > 0
        ? () => <ErrorItem message={validationErrors.join('<br>')} />
        : 'client.component.form.saveAbortedMessage'

    yield put(
      notification.toaster({
        type: 'warning',
        title: 'client.component.form.saveAbortedTitle',
        body,
        /*
         * normally a toaster of the type warning has a duration of -1 and the toaster must be manually closed
         * as the validation error is also shown as a mouseover of the save button the toaster can disappear
         * without manual closing
         */
        duration: 5000
      })
    )
  } else if (error instanceof rest.InformationError) {
    yield put(
      notification.toaster({
        type: 'info',
        title: 'client.component.form.saveAbortedTitle',
        body: error.message
      })
    )
    yield put(formActions.stopSubmit(formId))
  } else if (error instanceof rest.ForbiddenException) {
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.component.form.saveAbortedTitle',
        body: 'client.component.form.noPermission'
      })
    )
    yield put(formActions.stopSubmit(formId))
  } else if (error instanceof rest.ClientQuestionCancelledException) {
    yield put(formActions.stopSubmit(formId))
  } else {
    yield put(errorLogging.logError('client.common.unexpectedError', 'client.component.form.saveError', error))
    yield put(formActions.stopSubmit(formId))
  }
}
