import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {externalEvents, rest, notification} from 'tocco-app-extensions'
import {js, consoleLogger, api} from 'tocco-util'

import * as actions from './actions'

export const subscribeCalendarSelector = state => state.subscribeCalendar

export default function* sagas() {
  yield all([
    takeEvery(actions.FETCH_CALENDAR_LINKS, fetchCalendarLinks),
    takeLatest(actions.COPY_CALENDAR_LINK, copyCalendarLink)
  ])
}

export function* fetchCalendarLinks() {
  const where = 'exists(relCalendar where relLecturer.pk == :currentUser or relParticipant.pk == :currentUser)'
  const entities = yield call(
    rest.fetchEntities,
    'Calendar_export_conf',
    {where, paths: ['uuid', 'relCalendar.relCalendar_type.label']},
    {method: 'GET'}
  )
  if (entities.length > 0) {
    const {
      body: {baseUrl}
    } = yield call(rest.requestSaga, 'calendar/export/getBaseUrl')
    const calendarLinks = entities
      .map(entity => api.getFlattenEntity(entity))
      .map(entity => ({
        link: `${baseUrl}/${entity.uuid}`,
        label: entity['relCalendar.relCalendar_type.label'].join(', ')
      }))
    yield put(actions.setCalendarLinks(calendarLinks))
  } else {
    yield put(
      externalEvents.fireExternalEvent('onError', {
        title: 'client.actions.subscribe-calendar.toasterTitle',
        message: 'client.actions.subscribe-calendar.noCalendars'
      })
    )
  }
}

export function* copyCalendarLink({payload: {link}}) {
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
