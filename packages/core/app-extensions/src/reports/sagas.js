import {all, call, put, takeLatest} from 'redux-saga/effects'

import rest from '../rest'
import * as actions from './actions'

export const inputSelector = state => state.input

// same threshold as in ReportActionFormInterceptor
export const DEFAULT_CONFIRMATION_THRESHOLD = 100

export default function* sagas() {
  yield all([takeLatest(actions.LOAD_REPORTS, loadReport)])
}

export function* loadReport({payload: {reportIds}}) {
  if (reportIds.length === 0) {
    yield put(actions.setReports([]))
    return
  }

  const query = {
    where: `IN (unique_id,${reportIds.map(id => `"${id}"`).join(',')})`,
    paths: 'unique_id,label,ignore_selection'
  }

  const result = yield call(rest.fetchEntities, 'Report', query, {method: 'GET'})

  const reports = result.map(r => ({
    actionType: 'report',
    componentType: 'report',
    confirmationThreshold: r.paths.ignore_selection.value ? null : DEFAULT_CONFIRMATION_THRESHOLD,
    id: r.paths.unique_id.value,
    label: r.paths.label.value,
    reportId: r.paths.unique_id.value,
    showConfirmation: !r.paths.ignore_selection.value
  }))

  yield put(actions.setReports(reports))
}
