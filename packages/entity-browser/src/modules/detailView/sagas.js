import {takeLatest, takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  SubmissionError,
  getFormValues,
  touch,
  initialize as initializeForm
} from 'redux-form'

import {fetchEntity, updateEntity, fetchEntities} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'

import {formValuesToEntity, entityToFormValues, submitValidate, getDirtyFields} from '../../util/reduxForms'

export const detailViewSelector = state => state.detailView
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
  const keys = Object.keys(entity.paths)
  for (let i = 0; i < keys.length; i++) {
    let fieldStore = []
    const key = keys[i]
    const field = entity.paths[key]
    if (field.type === 'entity') {
      if (field.value != null) {
        fieldStore = [{value: field.value.key, label: field.value.display}]
      }
    } else if (field.type === 'entity-list') {
      if (field.value != null && field.value.length > 0) {
        fieldStore = field.value.map(e => ({value: e.key, label: e.display}))
      }
    }

    yield put(actions.setStore(key, fieldStore))
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
    const updatedEntity = yield call(updateEntity, entity)

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
