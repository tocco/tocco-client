export const UPLOAD_DOCUMENT = 'formData/UPLOAD_DOCUMENT'

export const uploadDocument = (formName, field, file) => ({
  type: UPLOAD_DOCUMENT,
  payload: {
    formName,
    file,
    field
  }
})
