import React from 'react'
import inputProvider from './inputProvider'

const FieldInput = props => {
  const disabled = props.disabled ? props.disabled : false
  return inputProvider(props.field, props.onChange, disabled)
}

FieldInput.propTypes = {
  field: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

export default FieldInput
