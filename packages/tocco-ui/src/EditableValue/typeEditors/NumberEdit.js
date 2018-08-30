import PropTypes from 'prop-types'
import React from 'react'

const convertStringToNumber = stringValue => (
  !stringValue || isNaN(stringValue) ? null : Number(stringValue)
)

const NumberEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(e.target.value))
    }
  }

  return (
    <input
      type="number"
      className="form-control"
      name={props.name}
      value={props.value}
      onChange={handleChange}
      id={props.id}
      disabled={props.readOnly}
    />
  )
}

NumberEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default NumberEdit
