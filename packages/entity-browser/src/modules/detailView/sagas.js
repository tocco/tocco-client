import {call, put, fork, select, takeLatest, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  SubmissionError,
  getFormValues,
  touch,
  initialize as initializeForm
} from 'redux-form'

import {fetchEntity, updateEntity, fetchEntities, getInitialSelectBoxStore} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'

import {formValuesToEntity, entityToFormValues, submitValidate, getDirtyFields} from '../../util/reduxForms'

export const detailViewSelector = state => state.detailView
export const formDefinitionSelector = state => state.detailView.formDefinition
export const formInitialValueSelector = formId =>
  state => state.form[formId].initial
export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_ENTITY, loadEntity),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm),
    fork(takeEvery, actions.LOAD_RELATION_ENTITIES, loadRelationEntities)
  ]
}

export function* initialize({payload}) {
  const {entityName, formBase} = payload
  yield put(actions.setEntityName(entityName))
  const detailFormDefinition = yield call(fetchForm, formBase + '_detail')
  yield put(actions.setFormDefinition(detailFormDefinition))
}

export function* loadEntity({payload}) {
  const {entityId} = payload
  const listView = yield select(detailViewSelector)
  const {entityName, formDefinition} = listView
  const fields = yield call(getFieldsOfDetailForm, formDefinition)
  const entity = yield call(fetchEntity, entityName, entityId, fields)

  yield put(actions.setEntity(entity))

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
  const values = yield select(getFormValues(formId))
  const initialValues = yield select(formInitialValueSelector(formId))
  yield put(startSubmit(formId))
  try {
    yield call(submitValidate, values)
    const dirtyFields = yield call(getDirtyFields, initialValues, values)
    const entity = yield call(formValuesToEntity, values, dirtyFields)
    const formDefinition = yield select(formDefinitionSelector)
    const fields = yield call(getFieldsOfDetailForm, formDefinition)
    const updatedEntity = yield call(updateEntity, entity, fields)
    const updatedFormValues = yield call(entityToFormValues, updatedEntity)
    yield put(initializeForm(formId, updatedFormValues))
    yield put(stopSubmit(formId))
  } catch (err) {
    if (err instanceof SubmissionError) {
      yield put(touch(formId, ...Object.keys(err.errors)))
      yield put(stopSubmit(formId, err.errors))
    } else {
      console.error(err)
      yield put(stopSubmit(formId, {_error: err.message}))
    }
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
