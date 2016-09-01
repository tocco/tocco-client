import React from 'react'
import DateFieldLabel from './DateFieldLabel'

const FieldLabel = props => {
  var content
  if (props.field.type === 'date' || props.field.type === 'birthdate') {
    content = <DateFieldLabel value={props.field.value}/>
  } else {
    content = <span>{props.field.value}</span>
  }

  return <div>{content}</div>
}

FieldLabel.propTypes = {
  field: React.PropTypes.object
}

export default FieldLabel
