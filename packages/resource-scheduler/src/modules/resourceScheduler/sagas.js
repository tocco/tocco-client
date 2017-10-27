import {call, put, fork, takeLatest, all, select} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import * as actions from './actions'
import {externalEvents} from 'tocco-util'

export const resourceSchedulerSelector = state => state.resourceScheduler

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.UPDATE_REQUESTED_CALENDARS, retrieveCalendars),
    fork(takeLatest, actions.SET_DATE_RANGE, retrieveCalendars),
    fork(takeLatest, actions.REMOVE_REQUESTED_CALENDAR, retrieveCalendars),
    fork(takeLatest, actions.ON_EVENT_CLICK, onEventClick)
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
    const calendarsResponse = yield call(requestSaga, 'calendars', {
      body: {
        payload: requestedCalendars,
        dateRange
      }
    })

    yield put(actions.setCalendars(calendarsResponse.body))
  }
}

export function* onEventClick({payload}) {
  yield put(externalEvents.fireExternalEvent('onEventClick', payload))
}
