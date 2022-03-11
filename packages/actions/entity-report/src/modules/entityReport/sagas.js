import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {actions as actionHandlers, externalEvents, rest} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input
export const textResourceSelector = (state, key) => state.intl.messages[key] || key

export default function* sagas() {
  yield all([takeLatest(actions.OPEN_REPORT_ACTION, openReportAction), takeLatest(actions.LOAD_REPORTS, loadReports)])
}

export function* openReportAction({payload: {reportId}}) {
  const definition = {reportId, actionType: 'report', componentType: 'report'}
  const {selection} = yield select(inputSelector)
  const parent = null

  const remoteEvents = [
    {
      type: 'action-trigger-event',
      payload: {
        func: actionHandlers.actions.actionInvoke,
        args: [definition, selection, parent]
      }
    }
  ]

  yield put(
    externalEvents.fireExternalEvent('onSuccess', {
      title: null, // disable success toaster
      remoteEvents
    })
  )
}

export function* loadReports() {
  const {actionProperties, selection} = yield select(inputSelector)

  const response = yield call(rest.requestSaga, 'report/getEntityReports', {
    method: 'POST',
    body: {
      selection,
      pathToReports: actionProperties.pathToReports
    }
  })

  const transformedReports = response.body.map(i => ({key: i.uniqueId, display: i.label}))

  if (transformedReports.length === 0) {
    yield put(
      externalEvents.fireExternalEvent('onError', {
        title: yield select(textResourceSelector, 'client.component.actions.errorText'),
        message: yield select(textResourceSelector, 'client.entity-report.no_reports')
      })
    )
  } else {
    yield put(actions.setReports(transformedReports))
  }
}
