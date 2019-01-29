import React from 'react'
import {Field} from 'redux-form'
import _get from 'lodash/get'
import _pick from 'lodash/pick'
import {Layout, Panel, Typography} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import ReduxFormFieldAdapter from './ReduxFormFieldAdapter'
import {getFieldId} from './formDefinition'
import {transformFieldName} from './reduxForm'
import actions from '../actions'
import componentTypes from './enums/componentTypes'
import layoutTypes from './enums/layoutTypes'
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

  const createAction = (child, key) => (
    <actions.Action
      definition={child}
      entity={entity.model}
      selection={actions.getSingleEntitySelection(entity.model, entity.key)}
      mode={mode}
      key={'detailAction' + key}
    />
  )

  const createFieldSet = (fieldSet, key) => {
    const fieldDefinition = fieldSet.children.find(child => !isAction(child.componentType))

    if (!fieldDefinition) {
      return null
    }

    const formDefinitionField = {
      ...fieldDefinition,
      ..._pick(fieldSet, ['label', 'hidden', 'readonly', 'scopes'])

    }

    const fieldName = formDefinitionField.path || formDefinitionField.id
    const entityField = entity ? entity.paths[fieldName] : null
    const modelSelector = formDefinitionField.path
      ? formDefinitionField.path.split('.')[0]
      : formDefinitionField.id
    const modelField = model[modelSelector]

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

      return !(isReadOnlyForm && hasEmptyValue(transformFieldName(formDefinitionField.id), formValues))
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
          format={null}
        />
      )
    }

    return null
  }

  const createLayoutComponent = (field, type, key, traverser) => {
    let elements = traverser()

    if (Array.isArray(elements)) {
      elements = elements.filter(el => el)
    }

    if (!elements || (Array.isArray(elements) && elements.length === 0)) {
      return null
    }

    const content = field.label
      ? <Panel.Wrapper isFramed={true} isOpen={true}>
        <Panel.Header><Typography.H4>{field.label}</Typography.H4></Panel.Header>
        <Panel.Body>{elements}</Panel.Body>
      </Panel.Wrapper>
      : elements

    const layoutMap = {
      [layoutTypes.HORIZONTAL_BOX]: Layout.Container,
      [layoutTypes.VERTICAL_BOX]: Layout.Box
    }

    const LayoutComponent = layoutMap[type]

    if (LayoutComponent) {
      return <LayoutComponent key={key}>{content}</LayoutComponent>
    } else {
      consoleLogger.logWarning(`Layout type "${type}" for box "${field.id}" is unknown.`)
      return <div key={key}>{content}</div>
    }
  }

  return () => {
    return formTraverser(formDefinition.children)
  }
}
