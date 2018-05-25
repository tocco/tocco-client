import {put, fork, takeLatest, all} from 'redux-saga/effects'
import * as actions from './actions'
import {externalEvents} from 'tocco-util'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.ON_DATE_RANGE_CHANGE, onDateRangeChange),
    fork(takeLatest, actions.ON_CALENDAR_REMOVE, onCalendarRemove),
    fork(takeLatest, actions.ON_EVENT_CLICK, onEventClick),
    fork(takeLatest, actions.ON_REFRESH, onRefresh)
  ])
}

export function* onDateRangeChange({payload}) {
  const {dateRange} = payload
  yield put(externalEvents.fireExternalEvent('onDateRangeChange', {dateRange}))
}

export function* onCalendarRemove({payload}) {
  yield put(externalEvents.fireExternalEvent('onCalendarRemove', {id: payload.id, calendarType: payload.calendarType}))
}

export function* onEventClick({payload}) {
  const {event: {entity}} = payload
  if (entity) {
    yield put(externalEvents.fireExternalEvent('onEventClick', entity))
  }
}

export function* onRefresh() {
  yield put(externalEvents.fireExternalEvent('onRefresh'))
}
