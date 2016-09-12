import React from 'react'
import FieldInput from '../FieldInput/FieldInput'

const FieldOption = props => {
  var field = {name: props.name, value: props.value, type: props.fieldType}

  return (
    <div>
      <FieldInput field={field} onChange={props.onChange}/>
    </div>
  )
}

FieldOption.propTypes = {
  name: React.PropTypes.string.isRequired,
  fieldType: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default FieldOption
