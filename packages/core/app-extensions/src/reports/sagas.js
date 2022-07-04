import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {api} from 'tocco-util'

import rest from '../rest'
import * as actions from './actions'

export const inputSelector = state => state.input
export const reportsSelector = state => state.reports

// same threshold as in ReportActionFormInterceptor
export const DEFAULT_CONFIRMATION_THRESHOLD = 100

export default function* sagas() {
  yield all([takeLatest(actions.LOAD_REPORTS, loadReport)])
}

export function* loadReport({payload: {reportIds, entityName, scope}}) {
  if (reportIds.length === 0) {
    yield put(actions.setReports([]))
    return
  }

  const reportConditions = getReportConditions(reportIds, entityName, scope)

  const query = {
    where: reportConditions,
    paths: 'unique_id,label,ignore_selection,relOutput_template.relReport_file_format.unique_id'
  }

  const result = yield call(rest.fetchEntities, 'Report', query, {method: 'GET'})

  const reports = yield all(
    result.map(entity => api.getFlattenEntity(entity)).map(report => call(buildReportDefinition, report))
  )

  yield put(actions.setReports(reports))
}

function* buildReportDefinition(report) {
  return {
    actionType: 'report',
    componentType: 'report',
    confirmationThreshold: report.ignore_selection ? null : DEFAULT_CONFIRMATION_THRESHOLD,
    id: report.unique_id,
    label: report.label,
    reportId: report.unique_id,
    showConfirmation: !report.ignore_selection,
    icon: yield call(getReportIcon, report)
  }
}

function* getReportIcon(report) {
  const reportIcons = yield call(loadReportIcons)
  const fileType = report['relOutput_template.relReport_file_format.unique_id']
  return reportIcons[fileType]
}

function* loadReportIcons() {
  const {reportIcons} = yield select(reportsSelector)
  if (!reportIcons) {
    const {body} = yield call(rest.requestSaga, '/client/report-icons', {method: 'GET'})
    yield put(actions.setReportIcons(body))
    return body
  } else {
    return reportIcons
  }
}

const getReportConditions = (reportIds, entityName, scope) => {
  const conditions = []
  conditions.push(`IN (unique_id,${reportIds.map(id => `"${id}"`).join(',')})`)
  if (entityName && scope) {
    conditions.push(
      `exists (
        relReport_placement where entity_model == "${entityName}"
        and relReport_location.unique_id == "${scope}"
      )`
    )
  } else if (entityName) {
    conditions.push(`exists (relReport_placement where entity_model == "${entityName}")`)
  } else if (scope) {
    conditions.push(`exists (relReport_placement where relReport_location.unique_id == "${scope}")`)
  }
  return conditions.join(' and ')
}
