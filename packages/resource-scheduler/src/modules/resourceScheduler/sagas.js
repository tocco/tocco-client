import {call, put, fork, takeLatest, all, select} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import * as actions from './actions'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.UPDATE_REQUESTED_CALENDARS, retrieveCalendars),
    fork(takeLatest, actions.SET_DATE_RANGE, retrieveCalendars)
  ])
}

export function* initialize() {
  yield call(loadCalendarTypes)
}

export function* loadCalendarTypes() {
  const calendars = yield call(requestSaga, 'calendarTypes')
  yield put(actions.setCalendarTypes(calendars.body))
}

export function* retrieveCalendars() {
  const {requestedCalendars, dateRange} = yield select(state => state.resourceScheduler)

  const calendarsResponse = yield call(requestSaga, 'calendars', {
    body: {
      payload: requestedCalendars,
      dateRange
    }
  })

  yield put(actions.setCalendars(calendarsResponse.body))
}
