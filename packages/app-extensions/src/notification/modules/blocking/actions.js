export const BLOCKING_INFO = 'notification/BLOCKING_INFO'
export const REMOVE_BLOCKING_INFO = 'notification/REMOVE_BLOCKING_INFO'

export const removeBlockingInfo = id => ({
  type: REMOVE_BLOCKING_INFO,
  payload: {
    id
  }
})
  
export const blockingInfo = (id, title, body) => ({
  type: BLOCKING_INFO,
  payload: {
    id,
    title,
    body
  }
})
