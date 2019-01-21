import PropTypes from 'prop-types'
import React from 'react'

import NumberEdit from './NumberEdit'

const IntegerEdit = props => {
  const handleChange = value => {
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <NumberEdit
      onChange={handleChange}
      value={props.value}
      options={props.options}
      id={props.id}
      name={props.name}
      readOnly={props.readOnly}
    />
  )
}

IntegerEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    prePointDigits: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
  })
}

export default IntegerEdit
