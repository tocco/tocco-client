export const MODAL = 'notification/MODAL'
export const REMOVE_MODAL = 'notification/REMOVE_MODAL'

export const modal = (id, title, message, component, closable = false) => ({
  type: MODAL,
  payload: {
    id,
    title,
    message,
    component,
    closable
  }
})

export const removeModal = id => ({
  type: REMOVE_MODAL,
  payload: {
    id
  }
})
