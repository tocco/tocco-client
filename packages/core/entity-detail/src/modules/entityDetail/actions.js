export const LOAD_DETAIL_VIEW = 'entityDetail/LOAD_DETAIL_VIEW'
export const SET_FORM_DEFINITION = 'entityDetail/SET_FORM_DEFINITION'
export const SET_ENTITY = 'entityDetail/SET_ENTITY'
export const SUBMIT_FORM = 'entityDetail/SUBMIT_FORM'
export const SET_LAST_SAVE = 'entityDetail/SET_LAST_SAVE'
export const SET_ENTITY_MODEL = 'entityDetail/SET_ENTITY_MODEL'
export const UNLOAD_DETAIL_VIEW = 'entityDetail/UNLOAD_DETAIL_VIEW'
export const FIRE_TOUCHED = 'entityDetail/FIRE_TOUCHED'
export const SET_TOUCHED = 'entityDetail/SET_TOUCHED'
export const TOUCH_ALL_FIELDS = 'entityDetail/TOCH_ALL_FIELDS'
export const NAVIGATE_TO_CREATE = 'entityDetail/NAVIGATE_TO_CREATE'
export const SET_FIELD_DEFINITIONS = 'entityDetail/SET_FIELD_DEFINITIONS'
export const NAVIGATE_TO_ACTION = 'entityDetail/NAVIGATE_TO_ACTION'
export const UPDATE_MARKED = 'entityDetail/UPDATE_MARKED'
export const SET_MARKED = 'entityDetail/SET_MARKED'
export const FORM_SUBMISSION_FAILED = 'entityDetail/FORM_SUBMISSION_FAILED'
export const FORM_SUBMITTED = 'entityDetail/FORM_SUBMITTED'

export const loadDetailView = () => ({
  type: LOAD_DETAIL_VIEW
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
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

export const setLastSave = (lastSave = Date.now()) => ({
  type: SET_LAST_SAVE,
  payload: {
    lastSave
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})

export const unloadDetailView = () => ({
  type: UNLOAD_DETAIL_VIEW
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

export const touchAllFields = () => ({
  type: TOUCH_ALL_FIELDS
})

export const navigateToCreate = relationName => ({
  type: NAVIGATE_TO_CREATE,
  payload: {
    relationName
  }
})

export const setFieldDefinitions = fieldDefinitions => ({
  type: SET_FIELD_DEFINITIONS,
  payload: {
    fieldDefinitions
  }
})

export const navigateToAction = (definition, selection) => ({
  type: NAVIGATE_TO_ACTION,
  payload: {
    definition,
    selection
  }
})

export const updateMarked = (entityName, entityId, marked) => ({
  type: UPDATE_MARKED,
  payload: {
    entityName,
    entityId,
    marked
  }
})

export const setMarked = marked => ({
  type: SET_MARKED,
  payload: {
    marked
  }
})

export const setFormSubmissionFailed = () => ({
  type: FORM_SUBMISSION_FAILED
})

export const setFormSubmitted = () => ({
  type: FORM_SUBMITTED
})
