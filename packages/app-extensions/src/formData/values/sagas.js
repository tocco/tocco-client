import {actions as formActions} from 'redux-form'
import {all, fork, put, takeEvery} from 'redux-saga/effects'

import form from '../../form'
import * as tooltipActions from './actions'

export default function* sagas() {
  yield all([
    fork(takeEvery, tooltipActions.CHANGE_FIELD_VALUE, changeValue),
    fork(takeEvery, tooltipActions.TOUCH_FIELD, touchField)
  ])
}

export function* changeValue({payload: {formName, fieldName, value}}) {
  yield put(formActions.change(formName, form.transformFieldName(fieldName), value))
}

export function* touchField({payload: {formName, fieldName}}) {
  yield put(formActions.touch(formName, form.transformFieldName(fieldName)))
}
