export const CHANGE_FIELD_VALUE = 'formData/CHANGE_FIELD_VALUE'

export const changeFieldValue = (formName, fieldName, value) => ({
  type: CHANGE_FIELD_VALUE,
  payload: {
    formName,
    fieldName,
    value
  }
})
