import React from 'react'
import classNames from 'classnames'
import ErrorList from './ErrorList'

const FormField = props => {
  if (props.hidden) {
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
      'sr-only': !props.useLabel,
      'dirty-label': props.dirty
    })

  const editableValueWrapperClass = classNames({
    'col-sm-8': props.useLabel,
    'col-sm-12': !props.useLabel
  })

  return (
    <div className={fromGroupClass}>
      <label className={labelClass} htmlFor={props.id}>
        {props.label}
        {props.mandatory && <span title="Mandatory field" className="mandatory"> *</span>}
      </label>
      <div className={editableValueWrapperClass}>
        {props.children}
        {props.touched && props.error && <ErrorList error={props.error}/>}
      </div>
    </div>
  )
}

FormField.defaultProps = {
  useLabel: true
}

FormField.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  children: React.PropTypes.node,
  hidden: React.PropTypes.bool,
  touched: React.PropTypes.bool,
  dirty: React.PropTypes.bool,
  useLabel: React.PropTypes.bool,
  error: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string))
}

export default FormField
