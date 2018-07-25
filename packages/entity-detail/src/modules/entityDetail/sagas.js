import {call, put, fork, select, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {
  actions as formActions,
  SubmissionError,
  getFormValues
} from 'redux-form'

import {externalEvents, notifier, errorLogging, form, actions as actionUtil, actionEmitter} from 'tocco-util'
import {ClientQuestionCancelledException} from 'tocco-util/src/rest'
import * as actions from './actions'
import {
  fetchEntity,
  updateEntity,
  fetchModel,
  createEntity
} from '../../util/api/entities'

import {uploadRequest, documentToFormValueTransformer} from '../../util/api/documents'
import {submitValidate} from '../../util/detailView/asyncValidation'
import modes from '../../util/modes'

export const formInitialValueSelector = formId => state => state.form[formId].initial
export const entityDetailSelector = state => state.entityDetail

const FORM_ID = 'detailForm'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.LOAD_DETAIL_VIEW, loadDetailView),
    fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, unloadDetailView),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm),
    fork(takeEvery, actions.UPLOAD_DOCUMENT, uploadDocument),
    fork(takeEvery, actions.FIRE_TOUCHED, fireTouched),
    fork(takeEvery, actionUtil.actions.ACTION_INVOKED, actionInvoked)
  ])
}

export function* loadDetailFormDefinition(formName) {
  const formDefinition = yield call(form.fetchForm, formName)
  yield put(actions.setFormDefinition(formDefinition))
  return formDefinition
}

export function* loadEntity(entityName, entityId, formDefinition, formName) {
  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  const fields = yield call(form.getFieldNames, fieldDefinitions)
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
  yield put(formActions.destroy(FORM_ID))
}

export function* loadEntityModel(entityName) {
  const entityModel = yield call(fetchModel, entityName)
  yield put(actions.setEntityModel(entityModel))
}

export function* loadDetailView() {
  const {entityName, formName, mode} = yield select(entityDetailSelector)

  yield call(loadEntityModel, entityName)
  const formDefinition = yield call(loadDetailFormDefinition, formName)

  if (mode === modes.CREATE) {
    yield put(actions.setEntity({paths: {}, model: entityName}))
    const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
    const defaultValues = yield call(form.getDefaultValues, fieldDefinitions)
    yield put(formActions.initialize(FORM_ID, defaultValues))
  } else {
    yield call(loadData)
  }
}

export function* updateFormSubmit(entity, fields) {
  const updatedEntity = yield call(updateEntity, entity, fields)
  const updatedFormValues = yield call(form.entityToFormValues, updatedEntity)
  yield put(formActions.initialize(FORM_ID, updatedFormValues))

  yield call(showNotification, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage')
  yield put(actions.setLastSave())
  yield put(formActions.stopSubmit(FORM_ID))
}

export function* createFormSubmit(entity, fields) {
  const createdEntityId = yield call(createEntity, entity, fields)
  yield put(externalEvents.fireExternalEvent('onEntityCreated', {id: createdEntityId}))
  yield call(showNotification, 'success', 'createSuccessfulTitle', 'createSuccessfulMessage')
}

export function* handleSubmitError(error) {
  if (error instanceof SubmissionError) {
    yield put(formActions.touch(FORM_ID, ...Object.keys(error.errors)))
    yield put(formActions.stopSubmit(FORM_ID, error.errors))
  } else {
    if (!(error instanceof ClientQuestionCancelledException)) {
      yield put(errorLogging.logError(
        'client.common.unexpectedError',
        'client.entity-detail.saveError',
        error
      ))
    }
    yield put(formActions.stopSubmit(FORM_ID))
  }

  yield call(showNotification, 'warning', 'saveAbortedTitle', 'saveAbortedMessage', 5000)
}

export function* getEntityForSubmit() {
  const values = yield select(getFormValues(FORM_ID))
  const initialValues = yield select(formInitialValueSelector(FORM_ID))
  yield put(formActions.startSubmit(FORM_ID))
  const {entityName, entityId, entityModel, mode} = yield select(entityDetailSelector)
  yield call(submitValidate, values, initialValues, entityName, entityId, entityModel, mode)
  const dirtyFields = yield call(form.getDirtyFields, initialValues, values, mode === modes.CREATE)
  return yield call(form.formValuesToEntity, values, dirtyFields, entityName, entityId, entityModel)
}

export function* getFields() {
  const {formDefinition} = yield select(entityDetailSelector)
  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  return yield call(form.getFieldNames, fieldDefinitions)
}

export function* submitForm() {
  try {
    const {mode} = yield select(entityDetailSelector)
    const entity = yield call(getEntityForSubmit)
    const fields = yield call(getFields)
    if (mode === modes.UPDATE) {
      yield call(updateFormSubmit, entity, fields)
    } else if (mode === modes.CREATE) {
      yield call(createFormSubmit, entity, fields)
    }
  } catch (error) {
    yield call(handleSubmitError, error)
  }
}

export function* uploadDocument({payload}) {
  const {file, field} = payload

  try {
    const uploadResponse = yield call(uploadRequest, file)

    if (uploadResponse.success) {
      const documentFormValue = yield call(documentToFormValueTransformer, uploadResponse, file)
      yield put(formActions.change(FORM_ID, field, documentFormValue))
    } else {
      throw new Error(`upload not successful: ${JSON.stringify(uploadResponse)}`)
    }
  } catch (error) {
    // timestamp is needed as workaround, so that Upload component rerenders
    yield put(formActions.change(FORM_ID, field, {id: null, timestamp: Date.now()}))
    yield put(errorLogging.logError(
      'client.component.form.uploadFailedTitle',
      'client.component.form.uploadFailedMessage',
      error
    ))
  }
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

export function* showNotification(type, titleResourceName, messageResourceName, duration = 2000) {
  yield put(notifier.info(
    type,
    `client.entity-detail.${titleResourceName}`,
    `client.entity-detail.${messageResourceName}`,
    'check',
    duration
  ))
}

export function* loadData() {
  const {entityName, entityId, formName, formDefinition} = yield select(entityDetailSelector)
  const entity = yield call(loadEntity, entityName, entityId, formDefinition, formName)
  const formValues = yield call(form.entityToFormValues, entity)
  yield put(formActions.initialize(FORM_ID, formValues, {keepDirty: true}))
}

export function* actionInvoked(action) {
  yield call(loadData)
  yield put(actionEmitter.emitAction(action))
}
