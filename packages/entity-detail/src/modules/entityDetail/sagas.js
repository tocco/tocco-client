import {
  actions as formActions,
  SubmissionError,
  getFormValues
} from 'redux-form'
import {externalEvents, notifier, errorLogging, form, actions as actionUtil, actionEmitter, rest}
  from 'tocco-app-extensions'
import {api} from 'tocco-util'
import {call, put, fork, select, takeLatest, takeEvery, all} from 'redux-saga/effects'

import * as actions from './actions'
import {
  updateEntity,
  createEntity
} from '../../util/api/entities'
import {submitValidate} from '../../util/detailView/asyncValidation'
import modes from '../../util/modes'

export const formInitialValueSelector = (state, formId) => state.form[formId].initial

export const entityDetailSelector = state => state.entityDetail

const FORM_ID = 'detailForm'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.LOAD_DETAIL_VIEW, loadDetailView),
    fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, unloadDetailView),
    fork(takeLatest, actions.TOUCH_ALL_FIELDS, touchAllFields),
    fork(takeEvery, actions.SUBMIT_FORM, submitForm),
    fork(takeEvery, actions.FIRE_TOUCHED, fireTouched),
    fork(takeEvery, actions.NAVIGATE_TO_CREATE, navigateToCreate),
    fork(takeEvery, actionUtil.actions.ACTION_INVOKED, actionInvoked)
  ])
}

export function* loadDetailFormDefinition(formName) {
  const formDefinition = yield call(rest.fetchForm, formName)
  yield put(actions.setFormDefinition(formDefinition))
  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  yield put(actions.setFieldDefinitions(fieldDefinitions))
  return {formDefinition, fieldDefinitions}
}

export function* loadEntity(entityName, entityId, fieldDefinitions) {
  const paths = yield call(form.getUsedPaths, fieldDefinitions)
  const entity = yield call(rest.fetchEntity, entityName, entityId, {paths})
  yield put(actions.setEntity(entity))
  return entity
}

export function* unloadDetailView() {
  yield put(actions.setEntity(null))
  yield put(formActions.destroy(FORM_ID))
}

export function* loadEntityModel(entityName) {
  const entityModel = yield call(rest.fetchModel, entityName)
  yield put(actions.setEntityModel(entityModel))
  return entityModel
}

export function* loadDetailView() {
  const {entityName, formName, mode, defaultValues} = yield select(entityDetailSelector)

  const model = yield call(loadEntityModel, entityName)
  const {fieldDefinitions} = yield call(loadDetailFormDefinition, formName)

  if (mode === modes.CREATE) {
    yield put(actions.setEntity({paths: {}, model: entityName}))
    const formDefaultValues = yield call(form.getDefaultValues, fieldDefinitions)
    const inputDefaultValues = yield call(form.loadDisplaysOfRelationFields, defaultValues, model)
    const defaultValuesFields = {...formDefaultValues, ...inputDefaultValues}
    const flattenEntity = yield call(api.getFlattenEntity, {model: entityName})
    const formValues = yield call(form.entityToFormValues, {...flattenEntity, ...defaultValuesFields})
    yield put(formActions.initialize(FORM_ID, formValues))
  } else {
    yield call(loadData)
  }
}

export function* updateFormSubmit(entity) {
  yield call(updateEntity, entity)
  yield call(loadData)

  yield call(showNotification, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage')
  yield put(actions.setLastSave())
  yield put(formActions.stopSubmit(FORM_ID))
}

export function* createFormSubmit(entity) {
  const createdEntityId = yield call(createEntity, entity)
  yield put(externalEvents.fireExternalEvent('onEntityCreated', {id: createdEntityId}))
  yield call(showNotification, 'success', 'createSuccessfulTitle', 'createSuccessfulMessage')
}

export function* touchAllFields() {
  const {fieldDefinitions} = yield select(entityDetailSelector)
  yield put(formActions.touch(FORM_ID, ...(fieldDefinitions.map(f => form.transformFieldName(f.path)))))
}

export function* handleSubmitError(error) {
  if (error instanceof SubmissionError) {
    yield call(touchAllFields)
    yield put(formActions.stopSubmit(FORM_ID, error.errors))
  } else {
    if (!(error instanceof rest.ClientQuestionCancelledException)) {
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
  const formValues = yield select(getFormValues(FORM_ID))
  const initialFormValues = yield select(formInitialValueSelector, FORM_ID)
  const {entityModel, mode} = yield select(entityDetailSelector)
  const initialValues = mode === modes.CREATE ? {} : initialFormValues
  yield put(formActions.startSubmit(FORM_ID))

  yield call(submitValidate, formValues, initialValues, entityModel, mode)
  const dirtyFields = yield call(form.getDirtyFields, initialValues, formValues, mode === modes.CREATE)
  const flattenEntity = yield call(form.formValuesToFlattenEntity, formValues)
  return yield call(api.toEntity, flattenEntity, dirtyFields)
}

export function* getPaths() {
  const {fieldDefinitions} = yield select(entityDetailSelector)
  return yield call(form.getUsedPaths, fieldDefinitions)
}

export function* submitForm() {
  try {
    const {mode} = yield select(entityDetailSelector)
    const entity = yield call(getEntityForSubmit)
    if (mode === modes.UPDATE) {
      yield call(updateFormSubmit, entity)
    } else if (mode === modes.CREATE) {
      yield call(createFormSubmit, entity)
    }
  } catch (error) {
    yield call(handleSubmitError, error)
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

export function* loadDisplayExpressions(formName, paths, entities) {
  if (paths && paths.length > 0) {
    const keys = entities.map(e => e.__key)
    const result = yield call(rest.fetchDisplayExpressions, formName, keys, paths)
    return result
  }
}

export function* loadRelationDisplays(relationFields, entities) {
  if (relationFields && relationFields.length > 0) {
    const request = yield call(api.getPathDisplayRequest, entities, relationFields, {})
    return yield call(rest.fetchDisplays, request)
  }
}

export function* enhanceEntityWithDisplayExpressions(entity) {
  const {fieldDefinitions, formName} = yield select(entityDetailSelector)
  const displayExpressions = fieldDefinitions.filter(f => f.componentType === 'display').map(f => f.id)
  const displayExpressionsL = yield call(loadDisplayExpressions, formName, displayExpressions, [entity])
  if (displayExpressionsL) {
    Object.keys(displayExpressionsL[entity.__key]).forEach(dE => {
      entity[dE] = displayExpressionsL[entity.__key][dE]
    })
  }
}

export function* enhanceEntityWithDisplays(entity) {
  const {fieldDefinitions} = yield select(entityDetailSelector)
  const relationFields = fieldDefinitions.filter(f => api.relationFieldTypes.includes(f.dataType)).map(f => f.path)

  const displays = yield call(loadRelationDisplays, relationFields, [entity])

  relationFields.forEach(relationField => {
    const value = entity[relationField]
    if (value) {
      const newValue = Array.isArray(value)
        ? value.map(v2 => ({...v2, display: displays[v2.model][v2.key]}))
        : {...value, display: displays[value.model][value.key]}
      entity[relationField] = newValue
    }
  })
}

export function* loadData(reset = true) {
  const {entityName, entityId, fieldDefinitions} = yield select(entityDetailSelector)
  const entity = yield call(loadEntity, entityName, entityId, fieldDefinitions)
  const flattenEntity = yield call(api.getFlattenEntity, entity)

  yield call(enhanceEntityWithDisplayExpressions, flattenEntity)
  yield call(enhanceEntityWithDisplays, flattenEntity)

  const formValues = yield call(form.entityToFormValues, flattenEntity)
  const options = reset ? {} : {keepDirty: true, keepValues: false}
  yield put(formActions.initialize(FORM_ID, formValues, options))
}

export function* actionInvoked(action) {
  yield call(loadData, false)
  yield put(actionEmitter.emitAction(action))
}

export function* navigateToCreate({payload}) {
  yield put(externalEvents.fireExternalEvent('onNavigateToCreate', payload.relationName))
}
