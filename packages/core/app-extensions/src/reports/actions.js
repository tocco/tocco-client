export const LOAD_REPORTS = 'formData/LOAD_REPORTS'
export const SET_REPORTS = 'formData/SET_REPORTS'
export const SET_REPORT_ICONS = 'formData/SET_REPORT_ICONS'

export const loadReports = (reportIds, entityName, scope) => ({
  type: LOAD_REPORTS,
  payload: {
    reportIds,
    entityName,
    scope
  }
})

export const setReports = reports => ({
  type: SET_REPORTS,
  payload: {
    reports
  }
})

export const setReportIcons = reportIcons => ({
  type: SET_REPORT_ICONS,
  payload: {
    reportIcons
  }
})
