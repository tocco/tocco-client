import {
  actions as formActions,
  getFormValues,
  isValid as isValidSelector,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors
} from 'redux-form'
import {SubmissionError} from 'redux-form/es/SubmissionError'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {externalEvents, notification, errorLogging, form, rest, remoteEvents}
  from 'tocco-app-extensions'
import {api} from 'tocco-util'
import {call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects'

import * as actions from './actions'
import {
  updateEntity,
  createEntity
} from '../../util/api/entities'
import modes from '../../util/modes'

export const formInitialValueSelector = (state, formId) => state.form[formId].initial

export const entityDetailSelector = state => state.entityDetail

const FORM_ID = 'detailForm'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeLatest(actions.LOAD_DETAIL_VIEW, loadDetailView),
    takeLatest(actions.UNLOAD_DETAIL_VIEW, unloadDetailView),
    takeLatest(actions.TOUCH_ALL_FIELDS, touchAllFields),
    takeEvery(actions.SUBMIT_FORM, submitForm),
    takeEvery(actions.FIRE_TOUCHED, fireTouched),
    takeEvery(actions.NAVIGATE_TO_CREATE, navigateToCreate),
    takeEvery(remoteEvents.REMOTE_EVENT, remoteEvent),
    takeLatest(actions.NAVIGATE_TO_ACTION, navigateToAction),
    takeEvery(formActionTypes.BLUR, onBlur)
  ])
}

export function* autoComplete(fieldName, autoCompleteEndpoint) {
  const options = {
    method: 'POST',
    body: {
      triggerField: fieldName,
      entity: yield call(getEntityForSubmit)
    }
  }

  const response = yield call(rest.requestSaga, autoCompleteEndpoint, options)
  const {values} = response.body
  const formValues = yield select(getFormValues(FORM_ID))

  yield all(Object.keys(values).map(fieldName => {
    const value = values[fieldName]
    const currentFieldValue = formValues[fieldName]
    if (value.mode === 'override' || (value.mode === 'if_empty' && form.isValueEmpty(currentFieldValue))) {
      return put(formActions.change(FORM_ID, fieldName, value.value))
    }
    return null
  }
  ))
}

export function* onBlur({meta}) {
  const {field} = meta
  const fieldDefinition = (yield (select(entityDetailSelector))).fieldDefinitions.find(fd => fd.id === field)
  if (fieldDefinition && fieldDefinition.autoCompleteEndpoint) {
    yield call(autoComplete, field, fieldDefinition.autoCompleteEndpoint)
  }
}

export function* loadDetailFormDefinition(formName, mode) {
  const formDefinition = yield call(rest.fetchForm, formName, mode)
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
  const {fieldDefinitions} = yield call(loadDetailFormDefinition, formName, mode)

  if (mode === modes.CREATE) {
    yield put(actions.setEntity({paths: {}, model: entityName}))
    const formDefaultValues = yield call(form.getDefaultValues, fieldDefinitions)
    const inputDefaultValues = defaultValues ? yield call(form.transformInputValues, defaultValues, model) : {}
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

  yield put(externalEvents.fireExternalEvent('onEntityUpdated'))
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
  yield put(formActions.touch(FORM_ID, ...(fieldDefinitions.map(f => form.transformFieldName(f.path || f.id)))))
}

export function* handleSubmitError(error) {
  if (error instanceof SubmissionError) {
    yield put(formActions.stopSubmit(FORM_ID, error.errors))
    yield call(handleInvalidForm)

    const validationErrors = yield call(form.formErrorsUtil.getValidatorErrors, error.errors)
    const message = (validationErrors && validationErrors.length > 0
      ? validationErrors.join('<br>')
      : 'client.entity-detail.saveAbortedMessage')

    yield put(notification.toaster(
      'warning',
      'client.entity-detail.saveAbortedTitle',
      message,
      null,
      5000
    ))
  } else if (error instanceof rest.InformationError) {
    yield put(notification.toaster({
      type: 'info',
      title: 'client.entity-detail.saveAbortedTitle',
      body: error.message
    }))
    yield put(formActions.stopSubmit(FORM_ID))
  } else {
    if (!(error instanceof rest.ClientQuestionCancelledException)) {
      yield put(errorLogging.logError(
        'client.common.unexpectedError',
        'client.entity-detail.saveError',
        error
      ))
      yield put(formActions.stopSubmit(FORM_ID))
    }
  }
}

export function* getCurrentEntityState() {
  const formValues = yield select(getFormValues(FORM_ID))
  const initialFormValues = yield select(formInitialValueSelector, FORM_ID)
  const {mode} = yield select(entityDetailSelector)
  const initialValues = mode === modes.CREATE ? {} : initialFormValues
  const dirtyFields = yield call(form.getDirtyFields, initialValues, formValues, mode === modes.CREATE)

  return {
    formValues,
    initialValues,
    mode,
    dirtyFields
  }
}

export function* submitValidate() {
  const {formValues, initialValues, mode} = yield call(getCurrentEntityState)
  yield call(form.submitValidation, formValues, initialValues, mode)
}

export function* getEntityForSubmit() {
  const {formValues, dirtyFields} = yield call(getCurrentEntityState)
  const flattenEntity = yield call(form.formValuesToFlattenEntity, formValues)
  const dirtyFieldNames = dirtyFields.map(fieldName => form.transformFieldNameBack(fieldName))
  return yield call(api.toEntity, flattenEntity, dirtyFieldNames)
}

export function* getPaths() {
  const {fieldDefinitions} = yield select(entityDetailSelector)
  return yield call(form.getUsedPaths, fieldDefinitions)
}

export function* getFormErrors() {
  return {
    ...(yield select(getFormSyncErrors(FORM_ID))),
    ...(yield select(getFormAsyncErrors(FORM_ID))),
    ...(yield select(getFormSubmitErrors(FORM_ID)))
  }
}

export function* focusErrorField() {
  const formErrors = yield call(getFormErrors)
  const firstErrorField = form.formErrorsUtil.getFirstErrorField(formErrors)
  if (firstErrorField) {
    const element = document.getElementById(form.getFieldId(FORM_ID, firstErrorField))
    if (element) {
      element.focus()
    }
  }
}

export function* handleInvalidForm() {
  yield call(touchAllFields)
  yield call(focusErrorField)
}

export function* submitForm() {
  try {
    const isValid = yield select(isValidSelector(FORM_ID))
    if (!isValid) {
      yield call(handleInvalidForm)
    } else {
      yield put(formActions.startSubmit(FORM_ID))
      const {mode} = yield select(entityDetailSelector)
      yield call(submitValidate)
      const entity = yield call(getEntityForSubmit)
      if (mode === modes.UPDATE) {
        yield call(updateFormSubmit, entity)
      } else if (mode === modes.CREATE) {
        yield call(createFormSubmit, entity)
      }
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

export function* showNotification(type, titleResourceName, messageResourceName) {
  yield put(notification.toaster({
    type,
    title: `client.entity-detail.${titleResourceName}`,
    body: `client.entity-detail.${messageResourceName}`
  }
  ))
}

export function* loadDisplayExpressions(formName, mode, paths, entities) {
  if (paths && paths.length > 0) {
    const keys = entities.map(e => e.__key)
    const result = yield call(rest.fetchDisplayExpressions, formName, mode, keys, paths)
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
  const {fieldDefinitions, formName, mode} = yield select(entityDetailSelector)
  const displayExpressions = fieldDefinitions.filter(f => f.componentType === 'display').map(f => f.id)
  const displayExpressionsL = yield call(loadDisplayExpressions, formName, mode, displayExpressions, [entity])
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

export function* navigateToCreate({payload}) {
  const {navigationStrategy} = yield select(inputSelector)
  yield call(navigationStrategy.navigateToCreateRelative, payload.relationName)
}

export function* navigateToAction({payload}) {
  const {definition, selection} = payload
  const {navigationStrategy} = yield select(inputSelector)
  yield call(navigationStrategy.navigateToActionRelative, definition, selection)
}

export const isCurrentEntity = (event, entityName, entityId) =>
  !!event.payload.entities.find(entity => entity.entityName === entityName && entity.key === entityId)
  || (event.payload.parent && event.payload.parent.model === entityName && event.payload.parent.key === entityId)

export function* remoteEvent(action) {
  const event = action.payload.event
  const {entityName, entityId} = yield select(entityDetailSelector)

  if (isCurrentEntity(event, entityName, entityId)) {
    switch (event.type) {
      case 'entity-delete-event':
        yield put(externalEvents.fireExternalEvent('onEntityDeleted'))
        break
      case 'entity-update-event':
        yield call(loadData, false)
        break
    }
  }
}
