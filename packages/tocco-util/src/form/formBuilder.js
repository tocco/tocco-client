import React from 'react'
import {transformFieldName} from './reduxForm'
import {Field} from 'redux-form'
import {getFieldId} from './helpers'
import ReduxFormFieldAdapter from './ReduxFormFieldAdapter'
import _get from 'lodash/get'
import _pick from 'lodash/pick'
import {LayoutBox} from 'tocco-ui'
import actions from '../actions'
import componentTypes from './componentTypes'
import layoutTypes from './layoutTypes'
import {isAction} from '../actions/actions'

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
  mode,
  componentMapping
) => {
  const isReadOnlyForm = formDefinition.readonly

  const formTraverser = children => {
    const result = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.componentType === componentTypes.LAYOUT) {
        const travers = () => formTraverser(child.children)
        result.push(createLayoutComponent(child, child.layoutType, i, travers))
      } else if (isAction(child.componentType)) {
        result.push(createAction(child, i))
      } else if (child.componentType === componentTypes.FIELD_SET) {
        result.push(createFieldSet(child, i))
      } else if (componentMapping && componentMapping[child.componentType]) {
        const component = componentMapping[child.componentType]
        const fieldName = child.id
        const modelField = model[fieldName]
        return component(child, modelField, i)
      }
    }

    return result
  }

  const createAction = (child, key) => {
    return <actions.Action
      definition={child}
      entity={entity.model}
      ids={[...(entity.key ? [entity.key] : [])]}
      mode={mode}
      key={'detailAction' + key}
    />
  }

  const createFieldSet = (fieldSet, key) => {
    const fieldDefinition = fieldSet.children.find(child => !isAction(child.componentType))

    if (!fieldDefinition) {
      return null
    }

    const formDefinitionField = {
      ..._pick(fieldSet, ['label', 'hidden', 'readonly', 'scopes']),
      ..._pick(fieldDefinition, ['componentType', 'dataType', 'id', 'defaultValue'])
    }

    const fieldName = formDefinitionField.id
    const entityField = entity ? entity.paths[fieldName] : null
    const modelField = model[fieldName]

    const shouldRenderField = (formDefinitionField, entityField) => {
      if (mode && formDefinitionField.scopes && formDefinitionField.scopes.length > 0
        && !formDefinitionField.scopes.includes(mode)) {
        return false
      }

      if (formDefinitionField.hidden) {
        return false
      }

      if (beforeRenderField && beforeRenderField(formDefinitionField.id) === false) {
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

      return !(isReadOnlyForm && hasEmptyValue(formDefinitionField.id, formValues))
    }

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
    if (type === layoutTypes.HORIZONTAL_BOX || type === layoutTypes.VERTICAL_BOX) {
      const alignment = type === layoutTypes.HORIZONTAL_BOX ? 'horizontal' : 'vertical'
      const children = traverser()

      if (children == null || (Array.isArray(children) && children.every(e => e == null))) {
        return null
      }

      return (
        <LayoutBox key={key} label={field.label} alignment={alignment}>
          {children}
        </LayoutBox>
      )
    }
  }

  return () => {
    return formTraverser(formDefinition.children)
  }
}
