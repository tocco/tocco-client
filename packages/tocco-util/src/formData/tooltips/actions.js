export const LOAD_TOOLTIP = 'formData/LOAD_TOOLTIP'
export const SET_TOOLTIP = 'formData/SET_TOOLTIP'

export const loadTooltip = (entity, id) => ({
  type: LOAD_TOOLTIP,
  payload: {
    entity,
    id
  }
})

export const setToolTip = (entity, id, tooltip) => ({
  type: SET_TOOLTIP,
  payload: {
    entity,
    id,
    tooltip
  }
})
