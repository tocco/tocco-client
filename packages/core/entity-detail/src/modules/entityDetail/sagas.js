import {actions as formActions, isValid as isValidSelector} from 'redux-form'
import {all, call, fork, put, select, takeEvery, takeLatest, take} from 'redux-saga/effects'
import {
  actions as actionExtensions,
  externalEvents,
  form,
  notification,
  remoteEvents,
  rest,
  display,
  reports
} from 'tocco-app-extensions'
import {api} from 'tocco-util'

import {createEntity, updateEntity} from '../../util/api/entities'
import {getFooterPaths} from '../../util/detailFooter/helpers'
import modes from '../../util/modes'
import * as actions from './actions'

export const formInitialValueSelector = (state, formId) => state.form[formId].initial

export const entityDetailSelector = state => state.entityDetail

export const inputSelector = state => state.input
export const intlSelector = state => state.intl

export const FORM_ID = 'detailForm'

export const formSagaConfig = {
  formId: FORM_ID,
  stateSelector: entityDetailSelector
}

export default function* sagas() {
  yield all([
    takeLatest(actions.LOAD_DETAIL_VIEW, loadDetailView),
    takeLatest(actions.UNLOAD_DETAIL_VIEW, unloadDetailView),
    takeLatest(actions.TOUCH_ALL_FIELDS, form.sagasUtils.touchAllFields, formSagaConfig),
    takeEvery(actions.SUBMIT_FORM, submitForm),
    takeEvery(actions.FIRE_TOUCHED, fireTouched),
    takeEvery(actions.NAVIGATE_TO_CREATE, navigateToCreate),
    takeEvery(remoteEvents.REMOTE_EVENT, remoteEvent),
    takeLatest(actions.NAVIGATE_TO_ACTION, navigateToAction),
    takeLatest(actions.UPDATE_MARKED, updateMarked),
    takeLatest(actionExtensions.actions.ACTION_INVOKED, reloadAfterAction)
  ])
}

export function* loadDetailFormDefinition(formName, mode, entityName, entityId) {
  const {modifyFormDefinition, reportIds} = yield select(inputSelector)
  const formDefinition = yield call(rest.fetchForm, formName, mode)
  const modifiedFormDefinition = modifyFormDefinition
    ? yield call(modifyFormDefinition, formDefinition, {entityName, entityId})
    : formDefinition
  const finalFormDefinition = yield call(addReportsToForm, reportIds, entityName, modifiedFormDefinition)
  yield put(actions.setFormDefinition(finalFormDefinition))
  const fieldDefinitions = yield call(form.getFieldDefinitions, finalFormDefinition)
  yield put(actions.setFieldDefinitions(fieldDefinitions))
  return {formDefinition: finalFormDefinition, fieldDefinitions}
}

function* addReportsToForm(reportIds, entityName, formDefinition) {
  if (reportIds?.length > 0) {
    yield put(reports.loadReports(reportIds, entityName, 'detail'))
    const {payload} = yield take(reports.SET_REPORTS)
    const {messages} = yield select(intlSelector)
    return yield call(form.addReports, formDefinition, payload.reports, messages['client.actiongroup.output'])
  } else {
    return formDefinition
  }
}

export function* loadEntity(entityName, entityId, fieldDefinitions) {
  const formPaths = yield call(form.getUsedPaths, fieldDefinitions)
  const {mode, entityModel} = yield select(entityDetailSelector)
  const footerPaths = yield call(getFooterPaths, mode, entityModel)
  const paths = [...formPaths, ...footerPaths]
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
  const {entityName, entityId, formName, mode, defaultValues} = yield select(entityDetailSelector)

  const model = yield call(loadEntityModel, entityName)
  const {fieldDefinitions} = yield call(loadDetailFormDefinition, formName, mode, entityName, entityId)

  if (mode === modes.CREATE) {
    yield put(actions.setEntity({paths: {}, model: entityName}))
    const formDefaultValues = yield call(form.getDefaultValues, fieldDefinitions)
    const inputDefaultValues = defaultValues ? yield call(form.transformInputValues, defaultValues, model) : {}
    const defaultValuesFields = {...formDefaultValues, ...inputDefaultValues}
    const flattenEntity = yield call(api.getFlattenEntity, {model: entityName})
    const formValues = yield call(form.entityToFormValues, {...flattenEntity, ...defaultValuesFields}, fieldDefinitions)
    yield put(formActions.initialize(FORM_ID, formValues))
  } else {
    yield call(loadData)
  }
}

export function* updateFormSubmit(entity, fieldDefinitions) {
  const updateResponse = yield call(updateEntity, entity, fieldDefinitions)
  if (updateResponse.status === 404) {
    // record was most likely moved to another business unit
    yield put(externalEvents.fireExternalEvent('onEntityDeleted'))
  } else {
    yield call(loadData)

    yield put(externalEvents.fireExternalEvent('onEntityUpdated'))
    yield call(showNotification, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage')
    yield put(actions.setLastSave())
    yield put(formActions.stopSubmit(FORM_ID))
  }
}

export function* createFormSubmit(entity, fieldDefinitions) {
  const createdEntityId = yield call(createEntity, entity, fieldDefinitions)
  yield put(externalEvents.fireExternalEvent('onEntityCreated', {id: createdEntityId}))
  yield call(showNotification, 'success', 'createSuccessfulTitle', 'createSuccessfulMessage')
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
      yield put(actions.setFormSubmissionFailed())
    } else {
      yield put(formActions.startSubmit(FORM_ID))
      const {mode, fieldDefinitions} = yield select(entityDetailSelector)
      yield call(submitValidate)
      const entity = yield call(form.sagasUtils.getEntityForSubmit, formSagaConfig)
      if (mode === modes.UPDATE) {
        yield call(updateFormSubmit, entity, fieldDefinitions)
      } else if (mode === modes.CREATE) {
        yield call(createFormSubmit, entity, fieldDefinitions)
      }
      yield put(actions.setFormSubmitted())
    }
  } catch (error) {
    yield call(form.sagasUtils.handleSubmitError, formSagaConfig, error)
    yield put(actions.setFormSubmissionFailed())
  }
}

export function* fireTouched({payload}) {
  const {touched: actionTouched} = payload
  const {touched: stateTouched} = yield select(entityDetailSelector)

  if (actionTouched !== stateTouched) {
    yield put(
      externalEvents.fireExternalEvent('onTouchedChange', {
        touched: actionTouched
      })
    )
    yield put(actions.setTouched(actionTouched))
  }
}

export function* showNotification(type, titleResourceName, messageResourceName) {
  yield put(
    notification.toaster({
      type,
      title: `client.entity-detail.${titleResourceName}`,
      body: `client.entity-detail.${messageResourceName}`
    })
  )
}

export function* loadRelationDisplays(relationFields, entities) {
  if (relationFields && relationFields.length > 0) {
    const request = yield call(api.getPathDisplayRequest, entities, relationFields, {})
    return yield call(rest.fetchDisplays, request)
  }
}

export function* loadData(reset = true) {
  const {entityName, entityId, fieldDefinitions, formName, entityModel, mode} = yield select(entityDetailSelector)

  if (entityModel.markable === true) {
    yield fork(loadMarked, entityName, entityId)
  }

  const entity = yield call(loadEntity, entityName, entityId, fieldDefinitions)
  const flattenEntity = yield call(api.getFlattenEntity, entity)

  yield call(display.enhanceEntityWithDisplayExpressions, flattenEntity, formName, fieldDefinitions, mode)
  yield call(display.enhanceEntityWithDisplays, flattenEntity, fieldDefinitions)

  const formValues = yield call(form.entityToFormValues, flattenEntity, fieldDefinitions)

  const options = reset ? {} : {keepDirty: true, keepValues: false}
  yield put(formActions.initialize(FORM_ID, formValues, options))
}

export function* loadMarked(entityName, entityId) {
  const marked = yield call(rest.fetchMarked, entityName, entityId)
  yield put(actions.setMarked(marked))
}

export function* updateMarked({payload: {entityName, entityId, marked}}) {
  yield put(actions.setMarked(marked))
  yield call(rest.setMarked, entityName, entityId, marked)
}

export function* reloadAfterAction({payload}) {
  const {definition} = payload
  if (definition.id !== 'delete') {
    yield call(loadData, true)
    yield put(externalEvents.fireExternalEvent('onRefresh'))
  }
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
  !!event.payload.entities.find(entity => entity.entityName === entityName && entity.key === entityId) ||
  (event.payload.parent && event.payload.parent.model === entityName && event.payload.parent.key === entityId)

export function* remoteEvent(action) {
  const event = action.payload.event
  const {entityName, entityId} = yield select(entityDetailSelector)

  if (event.type === 'action-trigger-event') {
    yield put(event.payload.func(...event.payload.args))
  } else if (isCurrentEntity(event, entityName, entityId)) {
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
