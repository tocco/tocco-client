import {call, put, fork, takeLatest, all} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import * as actions from './actions'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.ADD_CALENDARS_OF_TYPE, addCalendarsOfType)
  ])
}

export function* initialize() {
  yield call(loadCalendarTypes)
}

export function* loadCalendarTypes() {
  const calendars = yield call(requestSaga, 'calendarTypes')
  yield put(actions.setCalendarTypes(calendars.body))
}

export function* addCalendarsOfType({payload}) {
  const {calendarType, ids} = payload
  yield put(actions.addCalendars(ids.map(id => ({id, calendarType}))))
}
