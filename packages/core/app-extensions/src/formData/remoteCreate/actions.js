export const OPEN_REMOTE_CREATE = 'formData/OPEN_REMOTE_CREATE'

export const openRemoteCreate = (formField, formName, value) => ({
  type: OPEN_REMOTE_CREATE,
  payload: {
    formField,
    formName,
    value
  }
})
