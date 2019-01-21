import PropTypes from 'prop-types'
import React from 'react'

import NumberEdit from './NumberEdit'

const MoneyEdit = props => {
  const handleChange = value => {
    if (props.onChange) {
      props.onChange(value)
    }
  }

  const options = {
    ...props.options,
    postPointDigits: 2
  }

  return (
    <NumberEdit
      onChange={handleChange}
      value={props.value}
      options={options}
      id={props.id}
      name={props.name}
      readOnly={props.readOnly}
    />
  )
}

MoneyEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    postPointDigits: PropTypes.number,
    prePointDigits: PropTypes.number
  }).isRequired
}

export default MoneyEdit
