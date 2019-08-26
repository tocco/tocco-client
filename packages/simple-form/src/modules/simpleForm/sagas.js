import {getFormValues, actions as formActions, isValid} from 'redux-form'
import {CHANGE, UPDATE_SYNC_ERRORS, INITIALIZE} from 'redux-form/es/actionTypes'
import {externalEvents, form as formUtil} from 'tocco-app-extensions'
import {all, call, fork, put, select, takeEvery, takeLatest} from 'redux-saga/effects'

import * as actions from './actions'

const FORM_ID = 'simpleForm'
export const inputSelector = state => state.input
export const selector = state => state.simpleForm

export default function* sagas() {
  yield all([
    fork(takeEvery, actions.INITIALIZE_QUESTION_FORM, initialize),
    fork(takeEvery, actions.SUBMIT, submit),
    fork(takeEvery, actions.CANCEL, cancel),
    fork(takeLatest, CHANGE, change),
    fork(takeLatest, UPDATE_SYNC_ERRORS, change),
    fork(takeLatest, INITIALIZE, change)
  ])
}

export function* initialize() {
  const {form} = yield select(inputSelector)
  const fieldDefinitions = yield call(formUtil.getFieldDefinitions, form)
  const defaultValues = yield call(formUtil.getDefaultValues, fieldDefinitions)
  yield put(formActions.initialize(FORM_ID, defaultValues))
}

export function* submit() {
  const values = yield select(getFormValues(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onSubmit', {values}))
}

export function* cancel() {
  const values = yield select(getFormValues(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onCancel', {values}))
}

export function* change() {
  const values = yield select(getFormValues(FORM_ID))
  const valid = yield select(isValid(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onChange', {values, valid}))
}
