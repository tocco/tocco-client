import {call, put, fork, select, takeLatest, takeEvery} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'
import {
  startSubmit,
  stopSubmit,
  SubmissionError,
  getFormValues,
  touch,
  initialize as initializeForm,
  destroy as destroyForm
} from 'redux-form'

import {logError} from 'tocco-util/src/errorLogging'
import * as actions from './actions'
import {notify} from '../../../util/notification'
import {fetchEntity, updateEntity, fetchModel} from '../../../util//api/entities'
import {fetchForm, getFieldsOfDetailForm, getDetailFormName} from '../../../util//api/forms'
import {formValuesToEntity, entityToFormValues, getDirtyFields} from '../../../util//detailView/reduxForm'
import {submitValidate} from '../../../util//detailView/asyncValidation'

export const formDefinitionSelector = state => state.detail.formDefinition
export const formInitialValueSelector = formId => state => state.form[formId].initial
export const entityBrowserSelector = state => state.entityBrowser

const FORM_ID = 'detailForm'

export default function* sagas() {
  yield [
    fork(takeLatest, actions.LOAD_DETAIL_VIEW, loadDetailView),
    fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, unloadDetailView),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm)
  ]
}

export function* loadDetailFormDefinition(formDefinition, formName) {
  if (_isEmpty(formDefinition)) {
    formDefinition = yield call(fetchForm, formName)
    yield put(actions.setFormDefinition(formDefinition))
  }

  return formDefinition
}

export function* loadEntity(entityName, entityId, formDefinition, formName) {
  const fields = yield call(getFieldsOfDetailForm, formDefinition)
  const entity = yield call(fetchEntity, entityName, entityId, fields, formName)
  yield put(actions.setEntity(entity))
  return entity
}

export function* getTargetEntityName(entityName, modelPaths) {
  if (modelPaths && modelPaths.length > 0) {
    let model = yield call(fetchModel, entityName)

    for (const path of modelPaths) {
      const relation = model[path]
      if (!relation) {
        throw new Error(`No such path '${path}' found on entity model '${entityName}'`)
      }
      entityName = relation.targetEntity
      model = yield call(fetchModel, entityName)
    }
  }

  return entityName
}

export function* unloadDetailView() {
  yield put(actions.setEntity(null))
  yield put(destroyForm(FORM_ID))
}

export function* loadDetailView({payload}) {
  const {modelPaths, entityId} = payload

  const entityBrowser = yield select(entityBrowserSelector)
  let {formBase, formDefinition} = entityBrowser
  const {entityName} = entityBrowser

  let formName = yield call(getDetailFormName, formBase)

  const targetEntityName = yield call(getTargetEntityName, entityName, modelPaths)

  if (entityName !== targetEntityName) {
    formName = yield call(getDetailFormName, `${formBase}_${targetEntityName}`)
    formDefinition = null
  }

  const entityModel = yield call(fetchModel, targetEntityName)
  yield put(actions.setEntityModel(entityModel))

  formDefinition = yield call(loadDetailFormDefinition, formDefinition, formName)
  const entity = yield call(loadEntity, targetEntityName, entityId, formDefinition, formName)

  const formValues = yield call(entityToFormValues, entity)
  yield put(initializeForm(FORM_ID, formValues))
}

export function* submitForm() {
  try {
    const values = yield select(getFormValues(FORM_ID))
    const initialValues = yield select(formInitialValueSelector(FORM_ID))
    yield put(startSubmit(FORM_ID))
    yield call(submitValidate, values, initialValues)
    const dirtyFields = yield call(getDirtyFields, initialValues, values)
    const entity = yield call(formValuesToEntity, values, dirtyFields)
    const formDefinition = yield select(formDefinitionSelector)
    const fields = yield call(getFieldsOfDetailForm, formDefinition)
    const updatedEntity = yield call(updateEntity, entity, fields)
    const updatedFormValues = yield call(entityToFormValues, updatedEntity)
    yield put(initializeForm(FORM_ID, updatedFormValues))
    yield call(
      notify,
      'success',
      'client.entity-browser.detail.saveSuccessfulTitle',
      'client.entity-browser.detail.saveSuccessfulMessage',
      'floppy-saved', 2000
    )
    yield put(actions.setLastSave())
    yield put(stopSubmit(FORM_ID))
  } catch (error) {
    if (error instanceof SubmissionError) {
      yield put(touch(FORM_ID, ...Object.keys(error.errors)))
      yield put(stopSubmit(FORM_ID, error.errors))
    } else {
      yield put(logError('client.common.unexpectedError', 'client.entity-browser.detail.saveError', error))
      yield put(stopSubmit(FORM_ID))
    }

    yield notify(
      'warning',
      'client.entity-browser.detail.saveAbortedTitle',
      'client.entity-browser.detail.saveAbortedMessage',
      'floppy-remove',
      5000
    )
  }
}
