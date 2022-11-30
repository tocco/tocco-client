import _isFunction from 'lodash/isFunction'
import {actions as formActions, getFormValues} from 'redux-form'
import {all, call, put, takeLatest, select} from 'redux-saga/effects'
import {api} from 'tocco-util'

import display from '../../display'
import form from '../../form'
import rest from '../../rest'
import {REDUX_FORM_NAME} from '../components/TemplateForm'
import * as actions from './actions'

export const initializedSelector = state => state.templateValues.initialized
export const formDefinitionSelector = state => state.templateValues.formDefinition
export const fieldDefinitionSelector = state => state.templateValues.fieldDefinitions
export const selectedTemplateSelector = state => state.templateValues.selectedTemplate

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_TEMPLATES, initialize),
    takeLatest(actions.FETCH_TEMPLATES, fetchTemplates),
    takeLatest(actions.SET_TEMPLATE_VALUES, setTemplateValues)
  ])
}

export function* initialize({payload}) {
  const currentFormDefinition = yield select(formDefinitionSelector)
  if (!currentFormDefinition) {
    const {formName, defaultValues, customTemplateFields} = payload
    const formDefinition = yield call(rest.fetchForm, formName, 'detail')
    const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
    yield put(actions.setFieldDefinitions(fieldDefinitions))
    yield put(actions.setForm(formDefinition))

    yield put(formActions.initialize(REDUX_FORM_NAME))

    yield call(setFormValues, defaultValues, fieldDefinitions, customTemplateFields)
    yield call(fetchTemplates, {payload})
  }
}

export function* fetchTemplates({payload: {templateEntityName, selection, customTemplateFields}}) {
  const {
    body: {templates, defaultTemplate}
  } = yield call(rest.requestSaga, `templates/${templateEntityName}`, {
    method: 'POST',
    body: selection
  })
  const templateOptions = templates.map(responseTemplateTransformer(templateEntityName))
  yield put(actions.setTemplateOptions(templateOptions))

  const selectedTemplate = yield select(selectedTemplateSelector)
  if (!selectedTemplate && defaultTemplate) {
    yield put(
      actions.setValuesFromTemplate(
        templateEntityName,
        responseTemplateTransformer(templateEntityName)(defaultTemplate),
        customTemplateFields
      )
    )
  } else {
    yield put(actions.setInitialized(true))
  }
}

const responseTemplateTransformer = templateEntityName => template => ({
  display: template.label,
  key: template.key,
  model: templateEntityName
})

export function* setTemplateValues({payload: {templateEntityName, template, customTemplateFields}}) {
  if (template) {
    const fieldDefinitions = yield select(fieldDefinitionSelector)
    const paths = [...fieldDefinitions.map(field => field.id), ...Object.keys(customTemplateFields)]
    const templateValues = yield call(rest.fetchEntity, templateEntityName, template.key, {paths})
    const flattenedValues = yield call(api.getFlattenEntity, templateValues)
    yield call(setFormValues, flattenedValues, fieldDefinitions, customTemplateFields)
  } else {
    Object.values(customTemplateFields).forEach(f => f(null))
  }

  const initialized = yield select(initializedSelector)
  if (!initialized) {
    yield put(actions.setInitialized(true))
  }
}

export function* setFormValues(values, fieldDefinitions, customTemplateFields) {
  yield call(display.enhanceEntityWithDisplays, values, fieldDefinitions)

  const formValues = yield call(form.entityToFormValues, values, fieldDefinitions)
  for (const [fieldName, fieldValue] of Object.entries(formValues).filter(([, value]) => !!value)) {
    if (_isFunction(customTemplateFields[fieldName])) {
      customTemplateFields[fieldName](fieldValue)
    } else {
      yield put(formActions.change(REDUX_FORM_NAME, fieldName, fieldValue))
    }
  }
}

export function* getValues() {
  const formValues = yield select(getFormValues(REDUX_FORM_NAME))
  const fieldDefinitions = yield select(fieldDefinitionSelector)
  return yield call(form.formValuesToFlattenEntity, formValues, fieldDefinitions)
}
