export const UPLOAD_DOCUMENT = 'form/UPLOAD_DOCUMENT'

export const uploadDocument = (file, field) => ({
  type: UPLOAD_DOCUMENT,
  payload: {
    file,
    field
  }
})
