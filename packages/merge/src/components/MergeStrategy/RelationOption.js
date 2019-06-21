import PropTypes from 'prop-types'
import React from 'react'

import {StyledRelationOptionSelect} from './StyledRelationOption'

const RelationOption = props => {
  const handleOnChange = event => {
    props.onChange(props.name, event.target.value)
  }

  const options = []
  for (const propertyName in props.values) {
    options.push(
      <option
        key={`fieldset${props.name}${propertyName}`}
        value={propertyName}
      >
        {props.values[propertyName]}
      </option>
    )
  }

  return (
    <StyledRelationOptionSelect
      disabled={props.disabled}
      value={props.value}
      onChange={handleOnChange}>
      {options}
    </StyledRelationOptionSelect>
  )
}

RelationOption.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default RelationOption
