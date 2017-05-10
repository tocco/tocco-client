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
    {
      'mandatory': props.mandatory,
      'dirty': props.dirty,
      'has-error': props.error && props.touched
    }
  )

  const labelClass = classNames(
    'col-sm-3',
    'control-label',
    {
      'sr-only': !props.useLabel
    })

  const labelAlt = `${props.label} ${props.mandatory ? props.mandatoryTitle : ''}`

  const editableValueWrapperClass = classNames({
    'col-sm-9': props.useLabel,
    'col-sm-12': !props.useLabel
  })

  return (
    <div className={fromGroupClass}>
      <label className={labelClass} htmlFor={props.id} alt={labelAlt}>
        {props.label}
      </label>
      <div className={editableValueWrapperClass}>
        {props.children}
        {props.touched && props.error && <ErrorList error={props.error}/>}
      </div>
    </div>
  )
}

FormField.defaultProps = {
  useLabel: true,
  mandatoryTitle: 'is a mandatory field'
}

FormField.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  mandatoryTitle: React.PropTypes.string,
  children: React.PropTypes.node,
  hidden: React.PropTypes.bool,
  touched: React.PropTypes.bool,
  dirty: React.PropTypes.bool,
  useLabel: React.PropTypes.bool,
  error: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string))
}

export default FormField
