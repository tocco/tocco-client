import {call, put, fork, select, takeLatest, takeEvery} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'
import {
  startSubmit,
  stopSubmit,
  SubmissionError,
  getFormValues,
  touch,
  initialize as initializeForm
} from 'redux-form'

import {logError} from 'tocco-util/src/errorLogging'
import * as actions from './actions'
import {notify} from '../../../util/notification'
import {fetchEntity, updateEntity, fetchModel} from '../../../util//api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../../util//api/forms'
import {formValuesToEntity, entityToFormValues, getDirtyFields} from '../../../util//detailView/reduxForm'
import {submitValidate} from '../../../util//detailView/asyncValidation'

export const formDefinitionSelector = state => state.detail.formDefinition
export const formInitialValueSelector = formId => state => state.form[formId].initial
export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.LOAD_DETAIL_VIEW, loadDetailView),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm)
  ]
}

export function* loadDetailFormDefinition(formDefinition, formBase) {
  if (_isEmpty(formDefinition)) {
    formDefinition = yield call(fetchForm, formBase + '_detail')
    yield put(actions.setFormDefinition(formDefinition))
  }

  return formDefinition
}

export function* loadEntity(entityName, entityId, formDefinition) {
  const fields = yield call(getFieldsOfDetailForm, formDefinition)
  const entity = yield call(fetchEntity, entityName, entityId, fields)
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

export function* loadDetailView({payload}) {
  const {modelPaths, entityId} = payload

  const entityBrowser = yield select(entityBrowserSelector)
  let {formBase, formDefinition} = entityBrowser
  const {entityName} = entityBrowser

  const targetEntityName = yield call(getTargetEntityName, entityName, modelPaths)
  if (entityName !== targetEntityName) {
    formBase = `${formBase}_${targetEntityName}`
    formDefinition = null
  }

  formDefinition = yield call(loadDetailFormDefinition, formDefinition, formBase)
  const entity = yield call(loadEntity, targetEntityName, entityId, formDefinition)

  const formValues = yield call(entityToFormValues, entity)
  yield put(initializeForm('detailForm', formValues))
}

export function* submitForm() {
  const formId = 'detailForm'
  try {
    const values = yield select(getFormValues(formId))
    const initialValues = yield select(formInitialValueSelector(formId))
    yield put(startSubmit(formId))
    yield call(submitValidate, values, initialValues)
    const dirtyFields = yield call(getDirtyFields, initialValues, values)
    const entity = yield call(formValuesToEntity, values, dirtyFields)
    const formDefinition = yield select(formDefinitionSelector)
    const fields = yield call(getFieldsOfDetailForm, formDefinition)
    const updatedEntity = yield call(updateEntity, entity, fields)
    const updatedFormValues = yield call(entityToFormValues, updatedEntity)
    yield put(initializeForm(formId, updatedFormValues))
    yield call(notify, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage', 'floppy-saved', 2000)
    yield put(actions.setLastSave())
    yield put(stopSubmit(formId))
  } catch (error) {
    if (error instanceof SubmissionError) {
      yield put(touch(formId, ...Object.keys(error.errors)))
      yield put(stopSubmit(formId, error.errors))
    } else {
      yield put(logError('error.unhandled', 'entity-browser.saveError', error))
      yield put(stopSubmit(formId))
    }

    yield notify('warning', 'saveAbortedTitle', 'saveAbortedMessage', 'floppy-remove', 5000)
  }
}
