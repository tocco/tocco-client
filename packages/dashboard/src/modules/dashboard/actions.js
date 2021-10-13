export const LOAD_DASHBOARD = 'dashboard/LOAD_DASHBOARD'
export const SET_DASHBOARD = 'dashboard/SET_DASHBOARD'

export const loadDashboard = () => ({
  type: LOAD_DASHBOARD
})

export const setDashboard = infoboxes => ({
  type: SET_DASHBOARD,
  payload: {
    infoboxes
  }
})
