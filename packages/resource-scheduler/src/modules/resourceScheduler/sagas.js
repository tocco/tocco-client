import {requestSaga} from 'tocco-util/src/rest'
import {externalEvents} from 'tocco-util'

import * as actions from './actions'
import {transformRequestedCalendars} from '../../utils/rest'

import {call, put, fork, takeLatest, all, select} from 'redux-saga/effects'

export const resourceSchedulerSelector = state => state.resourceScheduler

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.UPDATE_REQUESTED_CALENDARS, retrieveCalendars),
    fork(takeLatest, actions.SET_DATE_RANGE, retrieveCalendars),
    fork(takeLatest, actions.REMOVE_REQUESTED_CALENDAR, retrieveCalendars),
    fork(takeLatest, actions.ON_EVENT_CLICK, onEventClick),
    fork(takeLatest, actions.ON_REFRESH, retrieveCalendars)
  ])
}

export function* initialize() {
  yield call(loadCalendarTypes)
}

export function* loadCalendarTypes() {
  const calendars = yield call(requestSaga, 'calendar/types')
  yield put(actions.setCalendarTypes(calendars.body.data || []))
}

export function* retrieveCalendars() {
  const {requestedCalendars, dateRange} = yield select(resourceSchedulerSelector)
  if (Object.keys(requestedCalendars).length > 0) {
    const calendars = yield call(transformRequestedCalendars, requestedCalendars)
    const calendarsResponse = yield call(requestSaga, 'calendar/events', {
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
