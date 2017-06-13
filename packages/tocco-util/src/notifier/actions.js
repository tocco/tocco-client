export const INFO = 'INFO'
export const CONFIRM = 'CONFIRM'

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

export const confirm = (message, okText, cancelText, onOk, onCancel) => ({
  type: CONFIRM,
  payload: {
    message,
    okText,
    cancelText,
    onOk,
    onCancel
  }
})
