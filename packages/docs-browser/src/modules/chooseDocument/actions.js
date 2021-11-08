export const CHOOSE_DOCUMENT = 'path/CHOOSE_DOCUMENT'

export const chooseDocument = (setDocument, formName, formFieldId) => ({
  type: CHOOSE_DOCUMENT,
  payload: {
    setDocument,
    formName,
    formFieldId
  }
})
