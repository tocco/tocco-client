import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'
import _get from 'lodash/get'

import {parseLocalePlaceholder, convertStringToNumber} from '../utils'
import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledNumberEdit from './StyledNumberEdit'

export const calculateMaxPointValue = (prePointDigits, postPointDigits, maxValue) => {
  if (prePointDigits && postPointDigits) {
    const maxValueMinuend = (10 ** prePointDigits)
    const maxValueSubtrahend = 1 / (10 ** postPointDigits)
    return maxValueMinuend - maxValueSubtrahend
  }
  if (prePointDigits) {
    return (10 ** prePointDigits) - 1
  }
  if (postPointDigits) {
    const postPointFraction = (1 / (10 ** postPointDigits))
    return maxValue ? maxValue - postPointFraction : 1E28 - postPointFraction
  }
}

export const isAllowedValue = (prePointDigits, postPointDigits, minValue, maxValue) => values => {
  if (!(prePointDigits || postPointDigits || minValue || maxValue)) {
    return true
  }
  const {formattedValue, floatValue} = values
  const maxPointValue = calculateMaxPointValue(prePointDigits, postPointDigits, maxValue)

  const isValidMaxPointValue = floatValue <= maxPointValue
  const isLargerThanMinValue = floatValue >= minValue
  const isSmallerThanMaxValue = floatValue <= maxValue

  let isValueInRange

  if (prePointDigits || postPointDigits) {
    isValueInRange = isValidMaxPointValue
  }
  if (minValue || maxValue) {
    isValueInRange = isLargerThanMinValue || isSmallerThanMaxValue
  }
  if ((prePointDigits || postPointDigits) && minValue) {
    isValueInRange = isValidMaxPointValue && isLargerThanMinValue
  }
  if ((prePointDigits || postPointDigits) && maxValue) {
    isValueInRange = isValidMaxPointValue && isSmallerThanMaxValue
  }
  if (minValue && maxValue) {
    isValueInRange = isLargerThanMinValue && isSmallerThanMaxValue
  }

  return formattedValue === '' || isValueInRange
}

const NumberEdit = (props, context) => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(context.intl.locale)

  const {prePointDigits, postPointDigits, minValue, maxValue, decimalScale, allowNegative} = props.options

  const numberFormatOptions = {
    isAllowed: isAllowedValue(prePointDigits, postPointDigits, minValue, maxValue),
    allowNegative: !!allowNegative,
    decimalScale: postPointDigits || decimalScale || 100
  }

  const handleChange = values => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(values.value))
    }
  }

  const value = _get(props, 'value', '')

  return (
    <StyledEditableWrapper readOnly={props.readOnly}>
      <StyledNumberEdit
        decimalSeparator={decimalSeparator}
        disabled={props.readOnly}
        id={props.id}
        isNumericString={true}
        name={props.name}
        onValueChange={handleChange}
        thousandSeparator={thousandSeparator}
        value={value}
        {...numberFormatOptions}
      />
    </StyledEditableWrapper>
  )
}

NumberEdit.contextTypes = {
  intl: intlShape
}

NumberEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  allowNegative: PropTypes.bool,
  options: PropTypes.shape({
    decimalScale: PropTypes.number,
    postPointDigits: PropTypes.number,
    prePointDigits: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
  }).isRequired
}

export default NumberEdit
