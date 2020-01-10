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

const FormBuilder = props => {
  const modeFitsScope = (mode, scopes) => (
    !mode || !scopes || scopes.length === 0 || scopes.includes(mode)
  )

  const formTraverser = children => {
    const result = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.componentType === componentTypes.LAYOUT) {
        const travers = () => formTraverser(child.children)
        result.push(createLayoutComponent(child, child.layoutType, travers))
      } else if (isAction(child.componentType)) {
        result.push(createAction(child))
      } else if (child.componentType === componentTypes.FIELD_SET) {
        result.push(createFieldSet(child))
      } else if (props.componentMapping && props.componentMapping[child.componentType]) {
        return createCustomComponent(child)
      }
    }
    return result
  }

  const createFieldSet = fieldSet => {
    const fieldDefinition = fieldSet.children.find(child => !isAction(child.componentType))

    if (!fieldDefinition) {
      return null
    }

    const formDefinitionField = {
      ...fieldDefinition,
      ..._pick(fieldSet, ['label', 'hidden', 'readonly', 'scopes'])
    }

    const fieldName = formDefinitionField.path || formDefinitionField.id
    const entityField = props.entity ? props.entity.paths[fieldName] : null
    const modelSelector = formDefinitionField.path
      ? formDefinitionField.path.split('.')[0]
      : formDefinitionField.id
    const modelField = props.model.paths[modelSelector]

    const shouldRenderField = (formDefinitionField, entityField) => {
      if (!modeFitsScope(props.mode, formDefinitionField.scopes)) {
        return false
      }

      if (formDefinitionField.hidden) {
        return false
      }

      if (props.beforeRenderField && props.beforeRenderField(fieldName) === false) {
        return false
      }

      const hasEmptyValue = (fieldName, formValues) => {
        if (!Object.prototype.hasOwnProperty.call(formValues, fieldName)) {
          return true
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

      return !(props.formDefinition.readonly
        && hasEmptyValue(transformFieldName(fieldName), props.formValues))
    }

    if (shouldRenderField(
      formDefinitionField,
      entityField,
      props.formValues,
      props.formDefinition.readonly)) {
      return (
        <Field
          key={`field-${fieldName}`}
          readOnlyForm={props.formDefinition.readonly}
          name={transformFieldName(fieldName)}
          id={getFieldId(props.formName, fieldName)}
          formName={props.formName}
          component={ReduxFormFieldAdapter}
          formDefinitionField={formDefinitionField}
          entityField={entityField}
          modelField={modelField}
          formFieldMapping={props.formFieldMapping}
          readOnlyFormFieldMapping={props.readOnlyFormFieldMapping}
          format={null}
        />
      )
    }

    return null
  }

  const createAction = action => {
    const model = _get(props, 'entity.model')
    const entityKey = _get(props, 'entity.key')

    return <actions.Action
      definition={action}
      selection={actions.getSingleEntitySelection(model, entityKey)}
      mode={props.mode}
      key={`action-${action.id}`}
      customActions={props.customActions}
    />
  }

  const createLayoutComponent = (field, type, traverser) => {
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
    const key = `layoutcomponent-${field.id}-${field.layoutType}`

    if (LayoutComponent) {
      return <LayoutComponent key={key}>{content}</LayoutComponent>
    } else {
      consoleLogger.logWarning(`Layout type "${type}" for box "${field.id}" is unknown.`)
      return null
    }
  }

  const createCustomComponent = field => {
    if (!modeFitsScope(props.mode, field.scopes)) {
      return null
    }

    const key = `layoutcomponent-${field.id}-${field.layoutType}`
    const component = props.componentMapping[field.componentType]
    const fieldName = field.id
    const modelField = props.model.paths[fieldName]
    return component(field, modelField, key)
  }

  return formTraverser(props.formDefinition.children)
}

FormBuilder.propTypes = {
  entity: PropTypes.object,
  model: PropTypes.object.isRequired,
  formName: PropTypes.string.isRequired,
  formDefinition: PropTypes.object.isRequired,
  formFieldMapping: PropTypes.object.isRequired,
  formValues: PropTypes.object,
  readOnlyFormFieldMapping: PropTypes.object,
  mode: PropTypes.string,
  componentMapping: PropTypes.objectOf(PropTypes.func),
  beforeRenderField: PropTypes.func,
  customActions: PropTypes.objectOf(PropTypes.func)
}

const updateIgnoreProps = ['formValues']

const areEqual = (prevProps, nextProps) => {
  const diff = Object.keys(js.difference(prevProps, nextProps))
    .filter(key => !updateIgnoreProps.includes(key))
  return diff.length === 0
}

export default React.memo(FormBuilder, areEqual)
