import {actions as formActions, isValid as isValidSelector} from 'redux-form'
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {form, rest, display, notification} from 'tocco-app-extensions'
import {api, env} from 'tocco-util'

import {fetchAddress, updateAddress} from '../../util/api/entities'
import * as actions from './actions'

export const addressUpdateSelector = state => state.addressUpdate

export const inputSelector = state => state.input

export const FORM_ID = 'addressForm'

export const formSagaConfig = {
  formId: FORM_ID,
  stateSelector: addressUpdateSelector
}

export default function* sagas() {
  yield all([
    takeLatest(actions.LOAD_VIEW, loadView),
    takeLatest(actions.UNLOAD_VIEW, unloadView),
    takeLatest(actions.TOUCH_ALL_FIELDS, form.sagasUtils.touchAllFields, formSagaConfig),
    takeEvery(actions.SUBMIT_FORM, submitForm),
    takeEvery(actions.FIRE_TOUCHED, fireTouched)
  ])
}

export function* loadDetailFormDefinition(formName, mode) {
  const formDefinition = yield call(rest.fetchForm, formName, mode)
  yield put(actions.setFormDefinition(formDefinition))
  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  yield put(actions.setFieldDefinitions(fieldDefinitions))
  return {formDefinition, fieldDefinitions}
}

export function* loadEntity(fieldDefinitions) {
  const widgetConfigKey = env.getWidgetConfigKey()
  const paths = yield call(form.getUsedPaths, fieldDefinitions)
  const entity = yield call(fetchAddress, widgetConfigKey, {paths})
  yield put(actions.setEntity(entity))
  return entity
}

export function* unloadView() {
  yield put(actions.setEntity(null))
  yield put(formActions.destroy(FORM_ID))
}

export function* loadView() {
  const {formName} = yield select(inputSelector)
  yield call(loadDetailFormDefinition, formName, 'detail')
  yield call(loadData)
}

export function* updateFormSubmit(entity, fieldDefinitions) {
  const widgetConfigKey = env.getWidgetConfigKey()
  yield call(updateAddress, widgetConfigKey, entity, fieldDefinitions)
  yield call(loadData)
  yield put(
    notification.toaster({
      type: 'success',
      title: 'client.address-update.saveSuccessfulTitle',
      body: 'client.address-update.saveSuccessfulMessage'
    })
  )
  yield put(formActions.stopSubmit(FORM_ID))
}

export function* submitValidate() {
  const {formValues, initialValues, mode, fieldDefinitions} = yield call(
    form.sagasUtils.getCurrentEntityState,
    formSagaConfig
  )
  yield call(form.submitValidation, formValues, initialValues, fieldDefinitions, mode)
}

export function* submitForm() {
  try {
    const isValid = yield select(isValidSelector(FORM_ID))
    if (!isValid) {
      yield call(form.sagasUtils.handleInvalidForm, formSagaConfig)
    } else {
      yield put(formActions.startSubmit(FORM_ID))
      const {fieldDefinitions} = yield select(addressUpdateSelector)
      yield call(submitValidate)
      const entity = yield call(form.sagasUtils.getEntityForSubmit, formSagaConfig)
      yield call(updateFormSubmit, entity, fieldDefinitions)
    }
  } catch (error) {
    yield call(form.sagasUtils.handleSubmitError, formSagaConfig, error)
  }
}

export function* fireTouched({payload}) {
  const {touched: actionTouched} = payload
  const {touched: stateTouched} = yield select(addressUpdateSelector)

  if (actionTouched !== stateTouched) {
    yield put(actions.setTouched(actionTouched))
  }
}

export function* loadData(reset = true) {
  const {fieldDefinitions, formName, mode} = yield select(addressUpdateSelector)

  const entity = yield call(loadEntity, fieldDefinitions)
  const flattenEntity = yield call(api.getFlattenEntity, entity)

  yield call(display.enhanceEntityWithDisplayExpressions, flattenEntity, formName, fieldDefinitions, mode)
  yield call(display.enhanceEntityWithDisplays, flattenEntity, fieldDefinitions)

  const formValues = yield call(form.entityToFormValues, flattenEntity, fieldDefinitions)

  const options = reset ? {} : {keepDirty: true, keepValues: false}
  yield put(formActions.initialize(FORM_ID, formValues, options))
}
