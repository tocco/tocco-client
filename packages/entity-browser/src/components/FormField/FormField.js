import React from 'react'
import classNames from 'classnames'
import _get from 'lodash/get'
import ErrorList from './ErrorList'
import fieldFactory from './fieldFactory'

const FormField = props => {
  if (props.formDefinitionField.displayType === 'HIDDEN') {
    return null
  }

  const fromGroupClass = classNames(
    'form-field',
    'form-group',
    {'has-error': props.error && props.touched}
  )

  const labelClass = classNames(
    'col-sm-4',
    'control-label',
    {
      'sr-only': props.formDefinitionField.useLabel !== 'YES',
      'dirty-label': props.dirty
    })

  const editableValueWrapperClass = classNames({
    'col-sm-8': props.formDefinitionField.useLabel !== 'HIDE',
    'col-sm-12': props.formDefinitionField.useLabel === 'HIDE'
  })

  const readOnly = (
    props.formDefinitionField.displayType === 'READONLY'
    || props.readOnly === true
    || !_get(props.entityField, 'value.writable', true)
  )
  const mandatory = _get(props.modelField, `validation.mandatory`, false)

  const {id, value, onChange} = props

  const valueField = fieldFactory(
    props.formDefinitionField,
    props.modelField,
    {
      id,
      value,
      onChange,
      readOnly,
      mandatory
    },
    props.events,
    props.utils
  )

  return (
    <div className={fromGroupClass}>
      <label className={labelClass} htmlFor={props.id}>
        {props.formDefinitionField.label}
        {mandatory && <span title="Mandatory field" className="mandatory"> *</span>}
      </label>
      <div className={editableValueWrapperClass}>
        {valueField}
        {props.touched && props.error && <ErrorList error={props.error}/>}
      </div>
    </div>
  )
}

FormField.propTypes = {
  formDefinitionField: React.PropTypes.shape({
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    displayType: React.PropTypes.string,
    useLabel: React.PropTypes.string,
    label: React.PropTypes.string
  }).isRequired,
  modelField: React.PropTypes.shape({
    fieldName: React.PropTypes.string,
    type: React.PropTypes.string
  }),
  entityField: React.PropTypes.shape({
    type: React.PropTypes.oneOf(['field', 'entity', 'entity-list']),
    value: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        readable: React.PropTypes.bool,
        writable: React.PropTypes.bool,
        type: React.PropTypes.string,
        value: React.PropTypes.any
      }),
      React.PropTypes.arrayOf(React.PropTypes.object)])
  }),
  id: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.any,
  events: React.PropTypes.objectOf(React.PropTypes.func),
  error: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string)),
  touched: React.PropTypes.bool,
  dirty: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  utils: React.PropTypes.object
}

export default FormField
