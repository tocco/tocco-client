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

class FormBuilder extends React.Component {
  createFieldSet = (fieldSet, key) => {
    const fieldDefinition = fieldSet.children.find(child => !isAction(child.componentType))

    if (!fieldDefinition) {
      return null
    }

    const formDefinitionField = {
      ...fieldDefinition,
      ..._pick(fieldSet, ['label', 'hidden', 'readonly', 'scopes'])

    }

    const fieldName = formDefinitionField.path || formDefinitionField.id
    const entityField = this.props.entity ? this.props.entity.paths[fieldName] : null
    const modelSelector = formDefinitionField.path
      ? formDefinitionField.path.split('.')[0]
      : formDefinitionField.id
    const modelField = this.props.model[modelSelector]

    const shouldRenderField = (formDefinitionField, entityField) => {
      if (this.props.mode && formDefinitionField.scopes && formDefinitionField.scopes.length > 0
        && !formDefinitionField.scopes.includes(this.props.mode)) {
        return false
      }

      if (formDefinitionField.hidden) {
        return false
      }

      if (this.props.beforeRenderField && this.props.beforeRenderField(formDefinitionField.id) === false) {
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

      return !(this.props.formDefinition.readonly
        && hasEmptyValue(transformFieldName(formDefinitionField.id), this.props.formValues))
    }

    if (shouldRenderField(
      formDefinitionField,
      entityField,
      this.props.formValues,
      this.props.formDefinition.readonly)) {
      return (
        <Field
          key={key}
          readOnlyForm={this.props.formDefinition.readonly}
          name={transformFieldName(fieldName)}
          id={getFieldId(this.props.formName, fieldName)}
          formName={this.props.formName}
          component={ReduxFormFieldAdapter}
          formDefinitionField={formDefinitionField}
          entityField={entityField}
          modelField={modelField}
          formFieldMapping={this.props.formFieldMapping}
          readOnlyFormFieldMapping={this.props.readOnlyFormFieldMapping}
          format={null}
        />
      )
    }

    return null
  }

  createAction = (child, key) => {
    return <actions.Action
      definition={child}
      entity={this.props.entity.model}
      ids={[...(this.props.entity.key ? [this.props.entity.key] : [])]}
      mode={this.props.mode}
      key={'detailAction' + key}
    />
  }

  createLayoutComponent = (field, type, key, traverser) => {
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

  formTraverser = children => {
    const result = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.componentType === componentTypes.LAYOUT) {
        const travers = () => this.formTraverser(child.children)
        result.push(this.createLayoutComponent(child, child.layoutType, i, travers))
      } else if (isAction(child.componentType)) {
        result.push(this.createAction(child, i))
      } else if (child.componentType === componentTypes.FIELD_SET) {
        result.push(this.createFieldSet(child, i))
      } else if (this.props.componentMapping && this.props.componentMapping[child.componentType]) {
        const component = this.props.componentMapping[child.componentType]
        const fieldName = child.id
        const modelField = this.props.model[fieldName]
        return component(child, modelField, i)
      }
    }
    return result
  }

  shouldComponentUpdate(nextProps, nextState) {
    const diff = js.difference(this.props, nextProps)

    const isEmpty = Object.keys(diff).length === 0

    const ignoredProps = ['formValues']
    const onlyIgnoredProps = Object.keys(diff).every(key => ignoredProps.includes(key))

    return !isEmpty && !onlyIgnoredProps
  }

  render() {
    return this.formTraverser(this.props.formDefinition.children)
  }
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
  beforeRenderField: PropTypes.func
}

export default FormBuilder
