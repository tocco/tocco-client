export const INFO = 'notifier/INFO'
export const CONFIRM = 'notifier/CONFIRM'
export const YES_NO_QUESTION = 'notifier/YES_NO_QUESTION'
export const BLOCKING_INFO = 'notifier/BLOCKING_INFO'
export const REMOVE_BLOCKING_INFO = 'notifier/REMOVE_BLOCKING_INFO'
export const MODAL_COMPONENT = 'notifier/MODAL_COMPONENT'
export const REMOVE_MODAL_COMPONENT = 'notifier/REMOVE_MODAL_COMPONENT'

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

export const modalComponent = (id, title, message, component, closable = false) => ({
  type: MODAL_COMPONENT,
  payload: {
    id,
    title,
    message,
    component,
    closable
  }
})

export const removeModalComponent = id => ({
  type: REMOVE_MODAL_COMPONENT,
  payload: {
    id
  }
})
