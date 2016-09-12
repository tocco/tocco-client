import React from 'react'

import FieldOption from './FieldOption'
import RelationOption from './RelationOption'

const Option = props => {
  var input
  if (props.fieldSet.type === 'field') {
    input = <FieldOption
      name={props.fieldSet.name}
      fieldType={props.fieldSet.fieldType}
      value={props.fieldSet.value}
      onChange={props.onValueChange}
    />
  } else if (props.fieldSet.type === 'relation') {
    input = <RelationOption
      name={props.fieldSet.name}
      value={props.fieldSet.value}
      values={props.fieldSet.values}
      onChange={props.onValueChange}
    />
  }

  var handleCheck = () => {
    props.activateOption(props.fieldSet.name, !props.fieldSet.active)
  }

  return (
    <div>
      <input type="checkbox" checked={props.fieldSet.active} onClick={handleCheck}/>
      <span>{props.fieldSet.label}</span>
      {input}
    </div>
  )
}

Option.propTypes = {
  fieldSet: React.PropTypes.object.isRequired,
  activateOption: React.PropTypes.func.isRequired,
  onValueChange: React.PropTypes.func.isRequired
}

export default Option
