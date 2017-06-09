export const NOTIFY = 'NOTIFY'
export const CONFIRM = 'CONFIRM'

export const notify = (type, title, message, icon, timeOut) => ({
  type: NOTIFY,
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
