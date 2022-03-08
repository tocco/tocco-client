export const LOAD_DASHBOARD = 'dashboard/LOAD_DASHBOARD'
export const SET_DASHBOARD = 'dashboard/SET_DASHBOARD'
export const SAVE_INFOBOX_POSITIONS = 'dashboard/SAVE_INFOBOX_POSITIONS'
export const SAVE_INFOBOX_HEIGHT = 'dashboard/SAVE_INFOBOX_HEIGHT'
export const DISPLAY_INFOBOX_SETTINGS_MODAL = 'dashboard/DISPLAY_INFOBOX_SETTINGS_MODAL'
export const RESET_INFOBOX_SETTINGS = 'dashboard/RESET_INFOBOX_SETTINGS'

export const loadDashboard = () => ({
  type: LOAD_DASHBOARD
})

export const setDashboard = infoBoxes => ({
  type: SET_DASHBOARD,
  payload: {
    infoBoxes
  }
})

export const saveInfoBoxPositions = infoBoxes => ({
  type: SAVE_INFOBOX_POSITIONS,
  payload: {
    infoBoxes
  }
})

export const saveInfoBoxHeight = (id, height) => ({
  type: SAVE_INFOBOX_HEIGHT,
  payload: {
    id,
    height
  }
})

export const displayInfoBoxSettings = () => ({
  type: DISPLAY_INFOBOX_SETTINGS_MODAL
})

export const resetInfoBoxSettings = () => ({
  type: RESET_INFOBOX_SETTINGS
})
