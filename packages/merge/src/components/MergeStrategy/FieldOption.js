import React from 'react'
import {EditableValue} from 'tocco-ui'

const FieldOption = props => {
  const onChange = value => {
    props.onChange(props.name, value)
  }
  return (
    <div>
      <EditableValue
        type={props.fieldType}
        id={props.name}
        value={props.value}
        onChange={onChange}
        readOnly={props.disabled}
      />
    </div>
  )
}

FieldOption.propTypes = {
  name: React.PropTypes.string.isRequired,
  fieldType: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

export default FieldOption
