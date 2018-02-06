import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import ErrorList from './ErrorList'

const FormField = props => {
  if (props.hidden) {
    return null
  }

  const fromGroupClass = classNames(
    'form-group',
    props.className,
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
      'sr-only': !props.label
    })

  const labelAlt = `${props.label}${props.mandatory ? `, ${props.mandatoryTitle}` : ''}`

  const editableValueWrapperClass = classNames({
    'col-sm-9': props.label,
    'col-sm-12': !props.label
  })

  return (
    <div className={fromGroupClass}>
      <label className={labelClass} htmlFor={props.id} alt={labelAlt} title={labelAlt}>
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
  mandatoryTitle: 'mandatory'
}

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  mandatory: PropTypes.bool,
  mandatoryTitle: PropTypes.string,
  children: PropTypes.node,
  hidden: PropTypes.bool,
  touched: PropTypes.bool,
  dirty: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
  ),
  className: PropTypes.string
}

export default FormField
