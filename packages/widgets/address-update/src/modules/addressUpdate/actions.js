export const SET_FORM_DEFINITION = 'addressUpdate/SET_FORM_DEFINITION'
export const LOAD_VIEW = 'addressUpdate/LOAD_VIEW'
export const SET_ENTITY = 'addressUpdate/SET_ENTITY'
export const SUBMIT_FORM = 'addressUpdate/SUBMIT_FORM'
export const UNLOAD_VIEW = 'addressUpdate/UNLOAD_VIEW'
export const FIRE_TOUCHED = 'addressUpdate/FIRE_TOUCHED'
export const SET_TOUCHED = 'addressUpdate/SET_TOUCHED'
export const SET_FORM_NAME = 'addressUpdate/SET_FORM_NAME'
export const TOUCH_ALL_FIELDS = 'addressUpdate/TOCH_ALL_FIELDS'
export const SET_FIELD_DEFINITIONS = 'addressUpdate/SET_FIELD_DEFINITIONS'

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const loadView = () => ({
  type: LOAD_VIEW
})

export const setEntity = entity => ({
  type: SET_ENTITY,
  payload: {
    entity
  }
})

export const submitForm = () => ({
  type: SUBMIT_FORM
})

export const unloadView = () => ({
  type: UNLOAD_VIEW
})

export const fireTouched = touched => ({
  type: FIRE_TOUCHED,
  payload: {
    touched
  }
})

export const setTouched = touched => ({
  type: SET_TOUCHED,
  payload: {
    touched
  }
})

export const setFormName = formName => ({
  type: SET_FORM_NAME,
  payload: {
    formName
  }
})

export const touchAllFields = () => ({
  type: TOUCH_ALL_FIELDS
})

export const setFieldDefinitions = fieldDefinitions => ({
  type: SET_FIELD_DEFINITIONS,
  payload: {
    fieldDefinitions
  }
})
