import React from 'react'
import inputProvider from './inputProvider'

const FieldInput = props => {
  return inputProvider(props.field, props.onChange)
}

FieldInput.propTypes = {
  field: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
}

export default FieldInput
