import PropTypes from 'prop-types'
import React from 'react'
import {EditableValue} from 'tocco-ui'

const FieldOption = props => {
  const onChange = value => {
    props.onChange(props.name, value)
  }
  return (
    <EditableValue
      type={props.fieldType}
      id={props.name}
      value={props.value}
      onChange={onChange}
      readOnly={props.disabled}
    />
  )
}

FieldOption.propTypes = {
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default FieldOption
