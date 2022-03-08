export const CHANGE_FIELD_VALUE = 'formData/CHANGE_FIELD_VALUE'
export const TOUCH_FIELD = 'formData/TOUCH_FIELD'

export const changeFieldValue = (formName, fieldName, value) => ({
  type: CHANGE_FIELD_VALUE,
  payload: {
    formName,
    fieldName,
    value
  }
})

export const touchField = (formName, fieldName) => ({
  type: TOUCH_FIELD,
  payload: {
    formName,
    fieldName
  }
})
