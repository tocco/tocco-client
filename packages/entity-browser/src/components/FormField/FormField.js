import React from 'react'
import classNames from 'classnames'
import _get from 'lodash/get'
import _mergeWith from 'lodash/mergeWith'

import {EditableValue} from 'tocco-ui'
import ErrorList from './ErrorList'
import {getEditableValueProps} from './formFieldUtil'

const mergeEvents = (eventObject1, eventObject2) => (
  _mergeWith(eventObject1, eventObject2, (event1, event2) =>
    () => {
      if (event1) event1()
      if (event2) event2()
    }
  ))

const FormField = props => {
  if (props.formDefinitionField.displayType === 'HIDDEN') {
    return null
  }

  const fromGroupClass = classNames(
    'form-field',
    'form-group',
    {'has-error': props.error && props.touched}
  )

  const labelClass = classNames({
    'hidden': props.formDefinitionField.useLabel !== 'YES',
    'dirty-label': props.dirty === true
  })

  const isReadOnly = (
    props.formDefinitionField.displayType === 'READONLY'
    || props.readOnly === true
    || !_get(props.entityField, 'value.writable', true)
  )
  const isMandatory = _get(props.modelField, `validation.mandatory`, false)
  const editableValueProps = getEditableValueProps(
    props.formDefinitionField,
    props.modelField,
    props.editableValueUtils
  )

  editableValueProps.events = mergeEvents(editableValueProps.events, props.events)

  return (
    <div className={fromGroupClass}>
      <label className="col-sm-4 control-label">
        <span className={labelClass}>{props.formDefinitionField.label}</span>
        {isMandatory && <span title="Mandatory field" className="mandatory"> *</span>}
      </label>
      <div className="col-sm-8">
        <EditableValue
          id={props.id}
          {...editableValueProps}
          value={props.value}
          onChange={props.onChange}
          readOnly={isReadOnly}
        />
        {props.touched && props.error && <ErrorList error={props.error}/>}
      </div>
    </div>
  )
}

FormField.propTypes = {
  formDefinitionField: React.PropTypes.object.isRequired,
  entityField: React.PropTypes.object,
  modelField: React.PropTypes.object,
  id: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.any,
  events: React.PropTypes.object,
  error: React.PropTypes.object,
  touched: React.PropTypes.bool,
  dirty: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  editableValueUtils: React.PropTypes.object
}

export default FormField
