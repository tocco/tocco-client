import * as actions from './actions'
import {all, call, fork, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {getFormValues, initialize as initializeForm} from 'redux-form'
import {getDefaultValues, getFieldDefinitions} from '../../../../entity-detail/src/util/api/forms'
import {externalEvents} from 'tocco-util'
import {fetchEntities} from 'tocco-util/src/rest'

const FORM_ID = 'simpleForm'
export const inputSelector = state => state.input
export const selector = state => state.simpleForm

export default function* sagas() {
  yield all([
    fork(takeEvery, actions.INITIALIZE_QUESTION_FORM, initialize),
    fork(takeEvery, actions.SUBMIT, submit),
    fork(takeEvery, actions.CANCEL, cancel),
    fork(takeLatest, actions.LOAD_RELATION_ENTITY, loadRelationEntity)
  ])
}

export function* initialize() {
  const {form} = yield select(inputSelector)
  const fieldDefinitions = yield call(getFieldDefinitions, form)
  const defaultValues = yield call(getDefaultValues, fieldDefinitions)
  yield put(initializeForm(FORM_ID, defaultValues))
}

export function* submit() {
  const values = yield select(getFormValues(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onSubmit', {...values}))
}

export function* cancel() {
  const values = yield select(getFormValues(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onCancel', {...values}))
}

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(selector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const entities = yield call(fetchEntities, entityName, {}, selectEntitiesTransformer)
    yield put(actions.setRelationEntity(entityName, entities, true))
    yield put(actions.setRelationEntityLoaded(entityName))
    return entities
  }
  return relationEntities[entityName].data
}

export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))
