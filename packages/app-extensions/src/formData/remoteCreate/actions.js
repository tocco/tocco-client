export const OPEN_REMOTE_CREATE = 'formData/OPEN_REMOTE_CREATE'
export const FINISH_CREATION = 'formData/FINISH_CREATION'

export const openRemoteCreate = (formField, formName) => ({
  type: OPEN_REMOTE_CREATE,
  payload: {
    formField,
    formName
  }
})
