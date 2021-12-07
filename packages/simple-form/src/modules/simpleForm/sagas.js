import {actions as formActions, getFormValues, isValid} from 'redux-form'
import {CHANGE, INITIALIZE, UPDATE_SYNC_ERRORS} from 'redux-form/es/actionTypes'
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {externalEvents, form as formUtil} from 'tocco-app-extensions'

import * as actions from './actions'

const FORM_ID = 'simpleForm'
export const inputSelector = state => state.input
export const selector = state => state.simpleForm

export default function* sagas() {
  yield all([
    takeEvery(actions.INITIALIZE_QUESTION_FORM, initialize),
    takeEvery(actions.SUBMIT, submit),
    takeEvery(actions.CANCEL, cancel),
    takeLatest(CHANGE, change),
    takeLatest(UPDATE_SYNC_ERRORS, change),
    takeLatest(INITIALIZE, change)
  ])
}

export function* initialize() {
  const {form, defaultValues: inputDefaultValues} = yield select(inputSelector)
  const fieldDefinitions = yield call(formUtil.getFieldDefinitions, form)
  const fromDefaultValues = yield call(formUtil.getDefaultValues, fieldDefinitions)
  yield put(formActions.initialize(FORM_ID, {...fromDefaultValues, ...inputDefaultValues}))
}

export function* submit() {
  const values = yield getValues()
  yield put(externalEvents.fireExternalEvent('onSubmit', {values}))
}

export function* cancel() {
  const values = yield getValues()
  yield put(externalEvents.fireExternalEvent('onCancel', {values}))
}

export function* change() {
  const values = yield getValues()
  const valid = yield select(isValid(FORM_ID))
  yield put(
    externalEvents.fireExternalEvent('onChange', {
      values,
      valid
    })
  )
}

function* getValues() {
  return Object.entries(yield select(getFormValues(FORM_ID))).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key.replace('--', '.')]: value
    }),
    {}
  )
}
