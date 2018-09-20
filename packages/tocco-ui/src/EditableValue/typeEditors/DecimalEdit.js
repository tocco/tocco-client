import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'
import NumberFormat from 'react-number-format'

import {parseLocalePlaceholder, limitValue} from '../utils'

const convertStringToNumber = stringValue => (
  !stringValue || isNaN(stringValue) ? null : parseFloat(stringValue)
)

const DecimalEdit = props => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(props.options.intl.locale)
  const value = props.value === null ? '' : props.value

  const handleChange = values => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(values.value))
    }
  }

  return (
    <NumberFormat
      className="form-control"
      disabled={props.readOnly}
      name={props.name}
      id={props.id}
      value={value}
      isNumericString={true}
      onValueChange={handleChange}
      decimalScale={props.options.postPointDigits}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      isAllowed={limitValue(props.options.maxValue)}
    />
  )
}

DecimalEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    intl: intlShape.isRequired,
    postPointDigits: PropTypes.number,
    maxValue: PropTypes.number
  })
}

export default DecimalEdit
