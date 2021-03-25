export const CONFIRM = 'notification/CONFIRM'
export const YES_NO_QUESTION = 'notification/YES_NO_QUESTION'

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
