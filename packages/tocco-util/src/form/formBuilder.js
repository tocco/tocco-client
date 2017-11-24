import React from 'react'
import {transformFieldName} from './reduxForm'
import {Field} from 'redux-form'
import {getFieldId} from './helpers'
import ReduxFormFieldAdapter from './ReduxFormFieldAdapter'
import _get from 'lodash/get'
import _startsWith from 'lodash/startsWith'
import {LayoutBox} from 'tocco-ui'
import actionFactory, {isAction} from '../actions/actionFactory'

const layoutTypeNamespace = 'ch.tocco.nice2.model.form.components.layout.'

export default (
  entity,
  model,
  formName,
  formDefinition,
  formValues,
  formFieldUtils,
  formFieldMapping,
  readOnlyFormFieldMapping,
  beforeRenderField,
  mode
) => {
  const isReadOnlyForm = formDefinition.displayType === 'READONLY'

  const formTraverser = children => {
    const result = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (_startsWith(child.type, layoutTypeNamespace)) {
        const type = child.type.substr(layoutTypeNamespace.length, child.type.length)
        const travers = () => formTraverser(child.children)
        result.push(createLayoutComponent(child, type, i, travers))
      } else if (isAction(child.type)) {
        result.push(actionFactory(child, i))
      } else {
        result.push(createField(child, i))
      }
    }

    return result
  }

  const shouldRenderField = (formDefinitionField, entityField) => {
    if (mode && formDefinitionField.scopes && formDefinitionField.scopes.length > 0
      && !formDefinitionField.scopes.includes(mode)) {
      return false
    }

    if (formDefinitionField.displayType === 'HIDDEN') {
      return false
    }

    if (beforeRenderField && beforeRenderField(formDefinitionField.name) === false) {
      return false
    }

    const hasEmptyValue = (fieldName, formValues) => {
      if (!formValues.hasOwnProperty(fieldName)) {
        return false
      } else {
        const value = formValues[fieldName]
        return (value == null || value === '' || (Array.isArray(value) && value.length === 0))
      }
    }

    if (entityField) {
      const isReadable = _get(entityField, 'value.readable', true)
      if (!isReadable) {
        return false
      }
    }

    return !(isReadOnlyForm && hasEmptyValue(formDefinitionField.name, formValues))
  }

  const createField = (formDefinitionField, key) => {
    const fieldName = formDefinitionField.name
    const entityField = entity ? entity.paths[fieldName] : null
    const modelField = model[fieldName]

    if (shouldRenderField(formDefinitionField, entityField, formValues, isReadOnlyForm)) {
      return (
        <Field
          key={key}
          readOnlyForm={isReadOnlyForm}
          name={transformFieldName(fieldName)}
          id={getFieldId(formName, fieldName)}
          component={ReduxFormFieldAdapter}
          formDefinitionField={formDefinitionField}
          entityField={entityField}
          modelField={modelField}
          formFieldUtils={formFieldUtils}
          formFieldMapping={formFieldMapping}
          readOnlyFormFieldMapping={readOnlyFormFieldMapping}
        />
      )
    }

    return null
  }

  const createLayoutComponent = (field, type, key, traverser) => {
    if (type === 'HorizontalBox' || type === 'VerticalBox') {
      const alignment = type === 'HorizontalBox' ? 'horizontal' : 'vertical'
      const label = field.useLabel ? field.label : undefined

      const children = traverser()

      if (children == null || (Array.isArray(children) && children.every(e => e == null))) {
        return null
      }

      return (
        <LayoutBox key={key} label={label} alignment={alignment}>
          {children}
        </LayoutBox>
      )
    }
  }

  return () => {
    return formTraverser(formDefinition.children)
  }
}
