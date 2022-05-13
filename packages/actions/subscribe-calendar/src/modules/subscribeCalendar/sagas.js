import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {externalEvents, rest, notification} from 'tocco-app-extensions'
import {js, consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const subscribeCalendarSelector = state => state.subscribeCalendar

export default function* sagas() {
  yield all([
    takeEvery(actions.FETCH_CALENDAR_LINK, fetchCalendarLink),
    takeLatest(actions.COPY_CALENDAR_LINK, copyCalendarLink)
  ])
}

export function* fetchCalendarLink() {
  const where = 'relCalendar.relCalendar_type.unique_id == "lecturer" and relCalendar.relLecturer.pk == :currentUser'
  const entities = yield call(rest.fetchEntities, 'Calendar_export_conf', {where, paths: ['uuid']}, {method: 'GET'})
  if (entities.length > 0) {
    const response = yield call(rest.requestSaga, 'calendar/export/getBaseUrl')
    yield put(actions.setCalendarLink(`${response.body.baseUrl}/${entities[0].paths.uuid.value}`))
  } else {
    yield put(
      externalEvents.fireExternalEvent('onError', {
        title: 'client.actions.subscribe-calendar.toasterTitle',
        message: 'client.actions.subscribe-calendar.noLecturerCalendar'
      })
    )
  }
}

export function* copyCalendarLink() {
  const {link} = yield select(subscribeCalendarSelector)
  try {
    yield call(js.copyToClipboard, link)
    yield put(
      notification.toaster({
        type: 'success',
        title: 'client.actions.subscribe-calendar.toasterTitle',
        body: 'client.actions.subscribe-calendar.copiedMessage'
      })
    )
  } catch (err) {
    consoleLogger.logError('Failed to copy calendar subscription link', err)
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.subscribe-calendar.toasterTitle',
        body: 'client.actions.subscribe-calendar.copyFailedMessage'
      })
    )
  }
}
