import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'

import {parseLocalePlaceholder, convertStringToNumber} from '../utils'
import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledNumberEdit from './StyledNumberEdit'

export const limitValue = maxValueObject => values => {
  const {formattedValue, floatValue} = values
  return formattedValue === '' || floatValue <= maxValueObject
}

export const calculateMaxValue = (prePointDigits, postPointDigits) => {
  const maxValueMinuend = (10 ** prePointDigits)
  const maxValueSubtrahend = 1 / (10 ** postPointDigits)
  return maxValueMinuend - maxValueSubtrahend
}

export const isAllowedIntegerValue = allowedIntegerObject => values => {
  const {formattedValue, floatValue} = values
  const {minValue, maxValue} = allowedIntegerObject
  return formattedValue === '' || (floatValue >= minValue && floatValue <= maxValue)
}

export const returnAllowedIntegerObject = (minValue, maxValue) => {
  return {minValue, maxValue}
}

const NumberEdit = (props, context) => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(context.intl.locale)
  const value = props.value === null ? '' : props.value

  const prePointDigits = props.options.prePointDigits
  const postPointDigits = props.options.postPointDigits
  const prePointMarker = prePointDigits === 0 ? true : prePointDigits
  const postPointMarker = postPointDigits === 0 ? true : postPointDigits

  const minValue = props.options.minValue
  const maxValue = props.options.maxValue
  const minValueMarker = minValue === 0 ? true : minValue
  const maxValueMarker = maxValue === 0 ? true : maxValue

  const numberFormatOptions = {
    ...(prePointMarker && postPointMarker
      ? {
        isAllowed: limitValue(calculateMaxValue(prePointDigits, postPointDigits)),
        decimalScale: postPointDigits
      } : {}),
    ...(minValueMarker && maxValueMarker
      ? {
        isAllowed: isAllowedIntegerValue(returnAllowedIntegerObject(minValue, maxValue)),
        decimalScale: 0,
        allowNegative: false
      } : {})
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
  isInteger: PropTypes.bool,
  options: PropTypes.shape({
    postPointDigits: PropTypes.number,
    prePointDigits: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
  }).isRequired
}

export default NumberEdit
