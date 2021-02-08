/* eslint-disable react/prop-types */
// propTypes are not recognized properly in this file
import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form'
import _get from 'lodash/get'
import _pick from 'lodash/pick'
import {Layout, Panel, Typography} from 'tocco-ui'
import {consoleLogger, js} from 'tocco-util'

import ReduxFormFieldAdapter from './ReduxFormFieldAdapter'
import {getFieldId} from './formDefinition'
import {transformFieldName} from './reduxForm'
import actions from '../actions'
import componentTypes from './enums/componentTypes'
import layoutTypes from './enums/layoutTypes'
import {isAction} from '../actions/actions'
import {StyledActionsWrapper} from './StyledFormBuilder'

const FormBuilder = props => {
  const {
    componentMapping,
    entity,
    mode,
    beforeRenderField,
    formDefinition,
    formValues,
    formName,
    fieldMappingType,
    customActions
  } = props

  const modeFitsScope = (mode, scopes) => (
    !mode || !scopes || scopes.length === 0 || scopes.includes(mode)
  )

  const formTraverser = (children, parentReadOnly = false) => {
    const result = []
    for (const child of children) {
      if (child.componentType === componentTypes.LAYOUT) {
        result.push(createLayoutComponent(child, child.layoutType, parentReadOnly))
      } else if (isAction(child.componentType)) {
        result.push(createAction(child))
      } else if (child.componentType === componentTypes.FIELD_SET) {
        result.push(createFieldSet(child, parentReadOnly))
      } else if (componentMapping && componentMapping[child.componentType]) {
        return createCustomComponent(child)
      }
    }
    return result
  }

  const createFieldSet = (fieldSet, parentReadOnly) => {
    const fieldDefinition = fieldSet.children.find(child => !isAction(child.componentType))

    if (!fieldDefinition) {
      return null
    }

    const formDefinitionField = {
      ...fieldDefinition,
      ..._pick(fieldSet, ['label', 'hidden', 'readonly', 'scopes'])
    }

    const fieldName = formDefinitionField.path || formDefinitionField.id
    const entityField = _get(entity, 'paths.' + fieldName.split('.').join('.value.paths.'))

    const shouldRenderField = (formDefinitionField, entityField) => {
      if (!modeFitsScope(mode, formDefinitionField.scopes)) {
        return false
      }

      if (formDefinitionField.hidden) {
        return false
      }

      if (beforeRenderField && !beforeRenderField(fieldName)) {
        return false
      }

      if (fieldMappingType === 'search') {
        return true
      }

      const hasEmptyValue = (fieldName, formValues) => {
        if (!Object.prototype.hasOwnProperty.call(formValues || {}, fieldName)) {
          return true
        } else {
          const value = formValues[fieldName]
          return (value == null || value === '' || (Array.isArray(value) && value.length === 0))
        }
      }

      const readOnly = (
        parentReadOnly
        || formDefinition.readonly
        || (entityField && entityField.writable === false)
        || (mode !== 'create' && !entityField)
        || formDefinitionField.readonly || formDefinitionField.componentType === 'display'
      )

      return !(readOnly && hasEmptyValue(transformFieldName(fieldName), formValues))
    }

    if (shouldRenderField(formDefinitionField, entityField)) {
      return <Field
        key={`field-${fieldName}`}
        parentReadOnly={parentReadOnly}
        name={transformFieldName(fieldName)}
        id={getFieldId(formName, fieldName)}
        formName={formName}
        component={ReduxFormFieldAdapter}
        formDefinitionField={formDefinitionField}
        entityField={entityField}
        fieldMappingType={fieldMappingType}
        format={null}
        mode={mode}
      />
    }

    return null
  }

  const createAction = action => {
    const entityName = _get(props, 'entity.model')
    const entityKey = _get(props, 'entity.key')

    return <StyledActionsWrapper
      key={`action-${action.id}`}
    >
      <actions.Action
        definition={action}
        selection={actions.getSingleEntitySelection(entityName, entityKey)}
        mode={mode}
        customActions={customActions}
      />
    </StyledActionsWrapper>
  }

  const createLayoutComponent = (field, type, parentReadOnly) => {
    let elements = formTraverser(field.children, parentReadOnly || field.readonly)

    if (Array.isArray(elements)) {
      elements = elements.filter(Boolean)
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
    const key = `layoutcomponent-${field.id}-${field.layoutType}`

    if (LayoutComponent) {
      return <LayoutComponent key={key}>{content}</LayoutComponent>
    } else {
      consoleLogger.logWarning(`Layout type "${type}" for box "${field.id}" is unknown.`)
      return null
    }
  }

  const createCustomComponent = field => {
    if (!modeFitsScope(mode, field.scopes)) {
      return null
    }

    const key = `custom-component-${field.id}-${field.layoutType}`
    const component = componentMapping[field.componentType]

    return component(field, key)
  }

  return formTraverser(formDefinition.children, formDefinition.readonly)
}

FormBuilder.propTypes = {
  entity: PropTypes.object,
  formName: PropTypes.string.isRequired,
  formDefinition: PropTypes.object.isRequired,
  formValues: PropTypes.object,
  mode: PropTypes.string,
  componentMapping: PropTypes.objectOf(PropTypes.func),
  beforeRenderField: PropTypes.func,
  customActions: PropTypes.objectOf(PropTypes.func)
}

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
  return diff.length === 0
}

export default React.memo(FormBuilder, areEqual)
