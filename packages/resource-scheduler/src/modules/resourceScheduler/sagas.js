import {rest, externalEvents} from 'tocco-app-extensions'
import {call, put, takeLatest, all, select} from 'redux-saga/effects'

import * as actions from './actions'
import {transformRequestedCalendars} from '../../utils/rest'

export const resourceSchedulerSelector = state => state.resourceScheduler

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.UPDATE_REQUESTED_CALENDARS, retrieveCalendars),
    takeLatest(actions.SET_DATE_RANGE, retrieveCalendars),
    takeLatest(actions.REMOVE_REQUESTED_CALENDAR, retrieveCalendars),
    takeLatest(actions.ON_EVENT_CLICK, onEventClick),
    takeLatest(actions.ON_REFRESH, retrieveCalendars)
  ])
}

export function* initialize() {
  yield call(loadCalendarTypes)
}

export function* loadCalendarTypes() {
  const calendars = yield call(rest.requestSaga, 'calendar/types')
  yield put(actions.setCalendarTypes(calendars.body.data || []))
}

export function* retrieveCalendars() {
  const {requestedCalendars, dateRange} = yield select(resourceSchedulerSelector)
  if (Object.keys(requestedCalendars).length > 0 && dateRange.startDate && dateRange.endDate) {
    const calendars = yield call(transformRequestedCalendars, requestedCalendars)
    const calendarsResponse = yield call(rest.requestSaga, 'calendar/events', {
      method: 'POST',
      body: {
        calendars,
        start: dateRange.startDate.getTime(),
        end: dateRange.endDate.getTime()
      }
    })

    yield put(actions.setCalendars(calendarsResponse.body.data))
  } else {
    yield put(actions.setCalendars([]))
  }
}

export function* onEventClick({payload}) {
  yield put(externalEvents.fireExternalEvent('onEventClick', payload))
}
