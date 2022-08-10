export const UPLOAD_DOCUMENT = 'formData/UPLOAD_DOCUMENT'
export const SET_DOCUMENT = 'formData/SET_DOCUMENT'

export const uploadDocument = (formName, field, file) => ({
  type: UPLOAD_DOCUMENT,
  payload: {
    formName,
    file,
    field
  }
})

export const setDocument = (formName, field, resourceId) => ({
  type: SET_DOCUMENT,
  payload: {
    formName,
    field,
    resourceId
  }
})
