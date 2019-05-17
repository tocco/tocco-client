import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'

import {parseLocalePlaceholder, convertStringToNumber} from '../utils'
import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledNumberEdit from './StyledNumberEdit'

export const calculateMaxValue = (prePointDigits, postPointDigits, maxValue) => {
  if (prePointDigits) {
    const calculatedMaxValue = (10 ** prePointDigits) - (postPointDigits ? (1 / (10 ** postPointDigits)) : 1)
    return maxValue && maxValue > calculatedMaxValue ? maxValue : calculatedMaxValue
  }

  return maxValue
}

export const isAllowedValue = (prePointDigits, postPointDigits, minValue, maxValue) => ({floatValue}) => {
  const calculatedMaxValue = calculateMaxValue(prePointDigits, postPointDigits, maxValue)

  if (calculatedMaxValue && floatValue > calculatedMaxValue) {
    return false
  }

  if (minValue && floatValue < minValue) {
    return false
  }

  return true
}

export const calculateDecimalScale = (postPointDigits, decimalScale) => {
  if (!isNaN(postPointDigits)) {
    return postPointDigits
  }

  return decimalScale
}

const NumberEdit = (props, context) => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(context.intl.locale)

  const {prePointDigits, postPointDigits, minValue, maxValue, decimalScale, allowNegative} = props.options

  const calculatedDecimalScale = calculateDecimalScale(postPointDigits, decimalScale)

  const numberFormatOptions = {
    isAllowed: isAllowedValue(prePointDigits, postPointDigits, minValue, maxValue),
    allowNegative: !!allowNegative,
    ...(!isNaN(calculatedDecimalScale) ? {decimalScale: calculatedDecimalScale} : {})
  }

  const handleChange = values => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(values.value))
    }
  }

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
        value={props.value}
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
  options: PropTypes.shape({
    allowNegative: PropTypes.bool,
    decimalScale: PropTypes.number,
    postPointDigits: PropTypes.number,
    prePointDigits: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
  }).isRequired
}

export default NumberEdit
