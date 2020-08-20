import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'
import React from 'react'
import {react} from 'tocco-util'

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

const getPreDecimalPositions = number => number !== 0 ? Math.ceil(Math.log10(Math.abs(number) + 1)) : 1

const checkValueRange = (minValue, maxValue, value) => {
  if (isNaN(value)) {
    return true
  }

  if (!isNaN(maxValue) && value > maxValue) {
    return false
  }

  if (!isNaN(minValue) && value < minValue) {
    return false
  }

  return true
}

export const isAllowedValue = (minValue, maxValue) => ({floatValue}) => {
  if (getPreDecimalPositions(floatValue) < getPreDecimalPositions(minValue)) {
    return true
  }

  return checkValueRange(minValue, maxValue, floatValue)
}

const NumberEdit = props => {
  const {thousandSeparator, decimalSeparator} = parseLocalePlaceholder(props.intl.locale)
  const {
    prePointDigits,
    postPointDigits,
    minValue,
    maxValue,
    allowNegative,
    fixedDecimalScale,
    suffix,
    prefix,
    format
  } = props.options || {}

  const calculatedMaxValue = calculateMaxValue(prePointDigits, postPointDigits, maxValue)
  const numberFormatOptions = {
    isAllowed: isAllowedValue(minValue, calculatedMaxValue),
    allowNegative: !!allowNegative,
    ...(!isNaN(postPointDigits) ? {decimalScale: postPointDigits} : {}),
    fixedDecimalScale: !!fixedDecimalScale
  }

  const handleChange = values => {
    if (props.onChange && checkValueRange(minValue, calculatedMaxValue, values.floatValue)) {
      props.onChange(values.floatValue)
    }
  }

  const handleBlur = event => {
    const valueBeforeBlur = convertStringToNumber(event.target.value)
    if (props.onChange && !checkValueRange(minValue, calculatedMaxValue, valueBeforeBlur)) {
      // if we reach this, then onChange was never called for the last entered value, so just remove it
      event.target.value = null
    }
  }

  return (
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledNumberEdit
        decimalSeparator={decimalSeparator}
        disabled={props.immutable}
        id={props.id}
        isNumericString={true}
        name={props.name}
        onValueChange={handleChange}
        immutable={props.immutable}
        thousandSeparator={thousandSeparator}
        value={props.value}
        suffix={suffix}
        prefix={prefix}
        {...numberFormatOptions}
        format={format}
        onBlur={handleBlur}
      />
    </StyledEditableWrapper>
  )
}

NumberEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  intl: intlShape,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    allowNegative: PropTypes.bool,
    fixedDecimalScale: PropTypes.bool,
    postPointDigits: PropTypes.number,
    prePointDigits: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    suffix: PropTypes.string,
    prefix: PropTypes.string,
    format: PropTypes.string
  })
}

export default injectIntl(react.Debouncer(NumberEdit, 800))
