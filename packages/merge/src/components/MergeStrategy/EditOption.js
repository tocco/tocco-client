import PropTypes from 'prop-types'
import React from 'react'
import {Typography} from 'tocco-ui'

import FieldOption from './FieldOption'
import RelationOption from './RelationOption'
import {EditOptionType} from './../../types/EditOptionType'

const EditOption = props => {
  let input
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

  const handleCheck = () => {
    props.activateEditOption(props.editOption.name, !props.editOption.active)
  }

  return (
    <Typography.P >
      <label>
        <input type="checkbox" checked={props.editOption.active} onClick={handleCheck}/>
        {props.editOption.label}
      </label><br/>
      {input}
    </Typography.P>
  )
}

EditOption.propTypes = {
  editOption: PropTypes.object.isRequired,
  activateEditOption: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired
}

export default EditOption
