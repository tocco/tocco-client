import {call, put, fork, select, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {
  startSubmit,
  stopSubmit,
  SubmissionError,
  getFormValues,
  touch,
  initialize as initializeForm,
  destroy as destroyForm
} from 'redux-form'

import {externalEvents, notifier, errorLogging, form} from 'tocco-util'
import {ClientQuestionCancelledException} from 'tocco-util/src/rest'
import * as actions from './actions'
import {
  fetchEntity,
  fetchEntities,
  updateEntity,
  fetchModel,
  selectEntitiesTransformer,
  createEntity
} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'
import {submitValidate} from '../../util/detailView/asyncValidation'
import modes from '../../util/modes'

export const formInitialValueSelector = formId => state => state.form[formId].initial
export const inputSelector = state => state.input
export const entityDetailSelector = state => state.entityDetail

const FORM_ID = 'detailForm'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.LOAD_DETAIL_VIEW, loadDetailView),
    fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, unloadDetailView),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm),
    fork(takeEvery, actions.LOAD_RELATION_ENTITY, loadRelationEntity),
    fork(takeEvery, actions.LOAD_REMOTE_ENTITY, loadRemoteEntity),
    fork(takeEvery, actions.FIRE_TOUCHED, fireTouched)
  ])
}

export function* loadDetailFormDefinition(formName) {
  const formDefinition = yield call(fetchForm, formName)
  yield put(actions.setFormDefinition(formDefinition))

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

export function* loadDetailView() {
  const {entityName, entityId, formName, mode} = yield select(inputSelector)
  const entityModel = yield call(fetchModel, entityName)
  yield put(actions.setEntityModel(entityModel))

  const formDefinition = yield call(loadDetailFormDefinition, formName)

  if (mode === modes.CREATE) {
    yield put(actions.setEntity({paths: {}}))
    const formValues = yield call(form.emptyValues, entityName)
    yield put(initializeForm(FORM_ID, formValues))
  } else {
    const entity = yield call(loadEntity, entityName, entityId, formDefinition, formName)
    const formValues = yield call(form.entityToFormValues, entity)
    yield put(initializeForm(FORM_ID, formValues))
  }
}

export function* submitForm() {
  try {
    const values = yield select(getFormValues(FORM_ID))
    const initialValues = yield select(formInitialValueSelector(FORM_ID))
    yield put(startSubmit(FORM_ID))
    const {entityModel, formDefinition} = yield select(entityDetailSelector)
    const {mode} = yield select(inputSelector)
    yield call(submitValidate, values, initialValues, entityModel, mode)
    const dirtyFields = yield call(form.getDirtyFields, initialValues, values)
    const entity = yield call(form.formValuesToEntity, values, dirtyFields, entityModel)
    const fields = yield call(getFieldsOfDetailForm, formDefinition)

    if (mode === modes.UPDATE) {
      const updatedEntity = yield call(updateEntity, entity, fields)
      const updatedFormValues = yield call(form.entityToFormValues, updatedEntity)
      yield put(initializeForm(FORM_ID, updatedFormValues))

      yield put(notifier.info(
        'success',
        'client.entity-detail.saveSuccessfulTitle',
        'client.entity-detail.saveSuccessfulMessage',
        'check',
        2000
      ))
      yield put(actions.setLastSave())
      yield put(stopSubmit(FORM_ID))
    } else if (mode === modes.CREATE) {
      const createdEntityId = yield call(createEntity, entity, fields)
      yield put(externalEvents.fireExternalEvent('onEntityCreated', {
        id: createdEntityId
      }))
      yield put(notifier.info(
        'success',
        'client.entity-detail.createSuccessfulTitle',
        'client.entity-detail.createSuccessfulMessage',
        'check',
        2000
      ))
    }
  } catch (error) {
    if (error instanceof SubmissionError) {
      yield put(touch(FORM_ID, ...Object.keys(error.errors)))
      yield put(stopSubmit(FORM_ID, error.errors))
    } else {
      if (!(error instanceof ClientQuestionCancelledException)) {
        yield put(errorLogging.logError(
          'client.common.unexpectedError',
          'client.entity-detail.saveError',
          error
        ))
      }

      yield put(stopSubmit(FORM_ID))
    }

    yield put(notifier.info(
      'warning',
      'client.entity-detail.saveAbortedTitle',
      'client.entity-detail.saveAbortedMessage',
      'ban',
      5000
    ))
  }
}

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(entityDetailSelector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const fetchParams = {
      fields: [],
      relations: []
    }
    const entities = yield call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer)
    yield put(actions.setRelationEntity(entityName, entities, true))
    yield put(actions.setRelationEntityLoaded(entityName))
  }
}

export function* loadRemoteEntity({payload}) {
  const {field, entityName, searchTerm} = payload
  yield put(actions.setRemoteEntityLoading(field))
  const limit = 100

  const fetchParams = {
    limit: limit + 1,
    fields: [],
    relations: [],
    searchInputs: {
      _search: searchTerm
    }
  }

  const entities = yield call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer)

  const moreOptionsAvailable = entities.length > limit

  yield put(actions.setRemoteEntity(field, entities.splice(0, limit), moreOptionsAvailable))
}

export function* fireTouched({payload}) {
  const {touched: actionTouched} = payload
  const {touched: stateTouched} = yield select(entityDetailSelector)

  if (actionTouched !== stateTouched) {
    yield put(externalEvents.fireExternalEvent('onTouchedChange', {
      touched: actionTouched
    }))
    yield put(actions.setTouched(actionTouched))
  }
}
