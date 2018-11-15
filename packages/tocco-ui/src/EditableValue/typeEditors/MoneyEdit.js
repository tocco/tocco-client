import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'

import DecimalEdit from './DecimalEdit'

const MoneyEdit = props => {
  const handleChange = value => {
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <DecimalEdit
      onChange={handleChange}
      value={props.value}
      options={props.options}
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
    intl: intlShape.isRequired,
    postPointDigits: PropTypes.number,
    prePointDigits: PropTypes.number
  }).isRequired
}

export default MoneyEdit
