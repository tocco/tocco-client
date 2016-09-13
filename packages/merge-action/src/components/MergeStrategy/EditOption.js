import React from 'react'

import FieldOption from './FieldOption'
import RelationOption from './RelationOption'

const EditOption = props => {
  var input
  if (props.editOption.type === 'field') {
    input = <FieldOption
      name={props.editOption.name}
      fieldType={props.editOption.fieldType}
      value={props.editOption.value}
      onChange={props.onValueChange}
      disabled={!props.editOption.active}
    />
  } else if (props.editOption.type === 'relation') {
    input = <RelationOption
      name={props.editOption.name}
      value={props.editOption.value}
      values={props.editOption.values}
      onChange={props.onValueChange}
      disabled={!props.editOption.active}
    />
  }

  var handleCheck = () => {
    props.activateEditOption(props.editOption.name, !props.editOption.active)
  }

  return (
    <div className="form-group">
      <input style={{width: '20px'}} type="checkbox" checked={props.editOption.active} onClick={handleCheck}/>
      <label className={props.editOption.active ? '' : 'disabled'}>{props.editOption.label}</label>
      {input}
    </div>
  )
}

EditOption.propTypes = {
  editOption: React.PropTypes.object.isRequired,
  activateEditOption: React.PropTypes.func.isRequired,
  onValueChange: React.PropTypes.func.isRequired
}

export default EditOption
