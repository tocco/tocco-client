export const LOAD_REPORTS = 'formData/LOAD_REPORTS'
export const SET_REPORTS = 'formData/SET_REPORTS'

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
