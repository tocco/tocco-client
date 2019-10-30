import {externalEvents} from 'tocco-app-extensions'
import {put, fork, takeLatest, all} from 'redux-saga/effects'

import * as actions from './actions'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.ON_DATE_RANGE_CHANGE, onDateRangeChange),
    fork(takeLatest, actions.ON_CALENDAR_REMOVE, onCalendarRemove),
    fork(takeLatest, actions.ON_CALENDARS_REMOVE_ALL, onCalendarRemoveAll),
    fork(takeLatest, actions.ON_EVENT_CLICK, onEventClick),
    fork(takeLatest, actions.ON_REFRESH, onRefresh),
    fork(takeLatest, actions.SET_CALENDARS, setCalendars)
  ])
}

export function* onDateRangeChange({payload}) {
  yield put(actions.setIsLoading(true))
  yield put(actions.removeEvents())
  const {dateRange} = payload
  yield put(externalEvents.fireExternalEvent('onDateRangeChange', {dateRange}))
}

export function* onCalendarRemove({payload}) {
  yield put(actions.setIsLoading(true))
  yield put(externalEvents.fireExternalEvent('onCalendarRemove', {id: payload.id, calendarType: payload.calendarType}))
}

export function* onCalendarRemoveAll() {
  yield put(actions.setIsLoading(true))
  yield put(externalEvents.fireExternalEvent('onCalendarRemoveAll'))
}

export function* onEventClick({payload}) {
  const {event: {extendedProps: {entity}}} = payload
  if (entity) {
    yield put(externalEvents.fireExternalEvent('onEventClick', entity))
  }
}

export function* onRefresh() {
  yield put(actions.setIsLoading(true))
  yield put(actions.removeEvents())
  yield put(externalEvents.fireExternalEvent('onRefresh'))
}

export function* setCalendars() {
  yield put(actions.setIsLoading(false))
}
