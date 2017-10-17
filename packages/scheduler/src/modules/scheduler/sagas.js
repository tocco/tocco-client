import {put, fork, takeLatest, all} from 'redux-saga/effects'
import * as actions from './actions'
import {externalEvents} from 'tocco-util'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.ON_DATE_RANGE_CHANGE, onDateRangeChange),
    fork(takeLatest, actions.ON_CALENDAT_REMOVE, onCalendarRemove)
  ])
}

export function* onDateRangeChange({payload}) {
  yield put(externalEvents.fireExternalEvent('onDateRangeChange', payload.dateRange))
}

export function* onCalendarRemove({payload}) {
  yield put(externalEvents.fireExternalEvent('onCalendarRemove', {id: payload.id, calendarType: payload.calendarType}))
}
