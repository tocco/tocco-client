import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'
import NumberFormat from 'react-number-format'

import {parseLocalePlaceholder, convertStringToNumber} from '../utils'

export const limitValue = maxValueObject => values => {
  const {formattedValue, floatValue} = values
  return formattedValue === '' || floatValue <= maxValueObject
}

const DecimalEdit = props => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(props.options.intl.locale)
  const value = props.value === null ? '' : props.value

  const maxInteger = (10 ** props.options.prePointDigits)
  const maxFloat = 1 / (10 ** props.options.postPointDigits)
  const maxValue = maxInteger - maxFloat
  
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
      isAllowed={limitValue(maxValue)}
    />
  )
}

DecimalEdit.defaultProps = {
  options: {
    prePointDigits: 12,
    postPointDigits: 2
  }
}

DecimalEdit.propTypes = {
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

export default DecimalEdit
