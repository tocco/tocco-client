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

import {initialize as initializeEntityBrowser} from '../../entity-browser/modules/actions'

import * as actions from './actions'
import {logError} from 'tocco-util/src/errorLogging'
import {notify} from '../../../util/notification'
import {fetchEntity, updateEntity, fetchEntities, getInitialSelectBoxStore} from '../../../util//api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../../util//api/forms'
import {formValuesToEntity, entityToFormValues, getDirtyFields} from '../../../util//detailView/reduxForm'
import {submitValidate} from '../../../util//detailView/asyncValidation'
export const detailViewSelector = state => state.detail
export const formDefinitionSelector = state => state.detail.formDefinition
export const formInitialValueSelector = formId => state => state.form[formId].initial
export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.LOAD_DETAIL_VIEW, loadDetailView),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm),
    fork(takeEvery, actions.LOAD_RELATION_ENTITIES, loadRelationEntities)
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

export function* loadDetailView({payload}) {
  const {entityId} = payload
  yield put(initializeEntityBrowser())

  const entityBrowser = yield select(entityBrowserSelector)
  let {formDefinition} = entityBrowser
  const {formBase, entityName} = entityBrowser

  formDefinition = yield call(loadDetailFormDefinition, formDefinition, formBase)
  const entity = yield call(loadEntity, entityName, entityId, formDefinition)

  const formValues = yield call(entityToFormValues, entity)

  // initialize store for fields of the types `entity` and `entity-list`
  const stores = yield call(getInitialSelectBoxStore, entity.paths)
  for (const store of stores) {
    yield put(actions.setStore(store.key, store.store))
  }

  yield put(initializeForm('detailForm', formValues))
}

export function* submitForm() {
  const formId = 'detailForm'
  try {
    const values = yield select(getFormValues(formId))
    const initialValues = yield select(formInitialValueSelector(formId))
    yield put(startSubmit(formId))
    yield call(submitValidate, values)
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

export function* loadRelationEntities({payload}) {
  const {entityName} = payload
  const {selectBoxStores} = yield select(detailViewSelector)
  const {entityModel} = yield select(entityBrowserSelector)
  const model = entityModel[entityName]
  if (model.type === 'relation' && (selectBoxStores[entityName] === undefined || !selectBoxStores[entityName].loaded)) {
    const modelName = model.targetEntity
    const entities = yield call(fetchEntities, modelName)
    const fieldStore = entities.data.map(e => ({label: e.display, value: e.key}))
    yield put(actions.setStore(entityName, fieldStore))
    yield put(actions.setStoreLoaded(entityName, true))
  }
}

