export const INITIALIZE_TEMPLATES = 'templateValues/INITIALIZE_TEMPLATES'
export const SET_FORM = 'templateValues/SET_FORM'
export const SET_INITIALIZED = 'templateValues/SET_INITIALIZED'
export const FETCH_TEMPLATES = 'templateValues/FETCH_TEMPLATES'
export const SET_TEMPLATE_OPTIONS = 'templateValues/SET_TEMPLATE_OPTIONS'
export const SET_TEMPLATE_VALUES = 'templateValues/SET_TEMPLATE_VALUES'
export const SET_FIELD_DEFINITIONS = 'templateValues/SET_FIELD_DEFINITIONS'

export const initializeTemplates = (templateEntityName, formName, selection, customTemplateFields, defaultValues) => ({
  type: INITIALIZE_TEMPLATES,
  payload: {templateEntityName, formName, selection, customTemplateFields, defaultValues}
})

export const setForm = formDefinition => ({
  type: SET_FORM,
  payload: {formDefinition}
})

export const setInitialized = initialized => ({
  type: SET_INITIALIZED,
  payload: {initialized}
})

export const fetchTemplates = (templateEntityName, selection, customTemplateFields) => ({
  type: FETCH_TEMPLATES,
  payload: {templateEntityName, selection, customTemplateFields}
})

export const setTemplateOptions = templateOptions => ({
  type: SET_TEMPLATE_OPTIONS,
  payload: {templateOptions}
})

export const setValuesFromTemplate = (templateEntityName, template, customTemplateFields) => ({
  type: SET_TEMPLATE_VALUES,
  payload: {templateEntityName, template, customTemplateFields}
})

export const setFieldDefinitions = fieldDefinitions => ({
  type: SET_FIELD_DEFINITIONS,
  payload: {
    fieldDefinitions
  }
})
