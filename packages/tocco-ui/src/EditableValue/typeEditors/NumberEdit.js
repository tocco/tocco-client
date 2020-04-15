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
    prefix
  } = props.options

  const numberFormatOptions = {
    isAllowed: isAllowedValue(prePointDigits, postPointDigits, minValue, maxValue),
    allowNegative: !!allowNegative,
    ...(!isNaN(postPointDigits) ? {decimalScale: postPointDigits} : {}),
    fixedDecimalScale: !!fixedDecimalScale
  }

  const handleChange = values => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(values.value))
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
    prefix: PropTypes.string
  })
}

export default injectIntl(react.Debouncer(NumberEdit, 800))
