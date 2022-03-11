export const OPEN_REPORT_ACTION = 'entityReport/OPEN_REPORT_ACTION'
export const LOAD_REPORTS = 'entityReport/LOAD_REPORTS'
export const SET_REPORTS = 'entityReport/SET_REPORTS'
export const SET_SELECTED_REPORT = 'entityReport/SET_SELECTED_REPORT'

export const openReportAction = reportId => ({
  type: OPEN_REPORT_ACTION,
  payload: {
    reportId
  }
})

export const loadReports = () => ({
  type: LOAD_REPORTS
})

export const setReports = reports => ({
  type: SET_REPORTS,
  payload: {
    reports
  }
})

export const setSelectedReport = selectedReport => ({
  type: SET_SELECTED_REPORT,
  payload: {
    selectedReport
  }
})
