export const INFO = 'INFO'
export const CONFIRM = 'CONFIRM'
export const YES_NO_QUESTION = 'YES_NO_QUESTION'
export const BLOCKING_INFO = 'BLOCKING_INFO'
export const REMOVE_BLOCKING_INFO = 'REMOVE_BLOCKING_INFO'

export const info = (type, title, message, icon, timeOut) => ({
  type: INFO,
  payload: {
    type,
    title,
    message,
    icon,
    timeOut
  }
})

export const confirm = (title, message, okText, cancelText, onOk, onCancel) => ({
  type: CONFIRM,
  payload: {
    title,
    message,
    okText,
    cancelText,
    onOk,
    onCancel
  }
})

export const yesNoQuestion = (title, message, yesText, noText, cancelText, onYes, onNo, onCancel) => ({
  type: YES_NO_QUESTION,
  payload: {
    title,
    message,
    yesText,
    noText,
    cancelText,
    onYes,
    onNo,
    onCancel
  }
})

export const removeBlockingInfo = id => ({
  type: REMOVE_BLOCKING_INFO,
  payload: {
    id
  }
})

export const blockingInfo = (id, title, message, icon) => ({
  type: BLOCKING_INFO,
  payload: {
    id,
    title,
    message,
    icon
  }
})
