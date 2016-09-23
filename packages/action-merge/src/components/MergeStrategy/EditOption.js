import React from 'react'
import classNames from 'classnames'

import FieldOption from './FieldOption'
import RelationOption from './RelationOption'
import {EditOptionType} from './../../types/EditOptionType'

const EditOption = props => {
  var input
  if (props.editOption.type === EditOptionType.field) {
    input = <FieldOption
      name={props.editOption.name}
      fieldType={props.editOption.fieldType}
      value={props.editOption.value}
      onChange={props.onValueChange}
      disabled={!props.editOption.active}
    />
  } else if (props.editOption.type === EditOptionType.relation) {
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

  var labelClasses = classNames(
    {
      'disabled': !props.editOption.active
    }
  )

  return (
    <div className="form-group">
      <input className="w20" type="checkbox" checked={props.editOption.active} onClick={handleCheck}/>
      <label className={labelClasses}>{props.editOption.label}</label>
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
