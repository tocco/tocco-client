import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'
import NumberFormat from 'react-number-format'

import {parseLocalePlaceholder, convertStringToNumber} from '../utils'

export const limitValue = maxValueObject => values => {
  const {formattedValue, floatValue} = values
  return formattedValue === '' || floatValue <= maxValueObject
}

export const calculateMaxValue = (prePointDigits, postPointDigits) => {
  const maxValueMinuend = (10 ** prePointDigits)
  const maxValueSubtrahend = 1 / (10 ** postPointDigits)
  return maxValueMinuend - maxValueSubtrahend
}

const DecimalEdit = props => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(props.options.intl.locale)
  const value = props.value === null ? '' : props.value

  const prePointDigits = props.options.prePointDigits
  const postPointDigits = props.options.postPointDigits

  const numberFormatOptions = {
    ...(prePointDigits && postPointDigits
      ? {isAllowed: limitValue(calculateMaxValue(prePointDigits, postPointDigits))} : {}),
    ...(postPointDigits ? {decimalScale: postPointDigits} : {})
  }

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
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      {...numberFormatOptions}
    />
  )
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
