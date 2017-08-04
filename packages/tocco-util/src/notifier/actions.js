export const INFO = 'INFO'
export const CONFIRM = 'CONFIRM'
export const YES_NO_QUESTION = 'YES_NO_QUESTION'

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
