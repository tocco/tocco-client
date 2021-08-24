import PropTypes from 'prop-types'
import React from 'react'
import {react} from 'tocco-util'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledNumberEdit from './StyledNumberEdit'

const IntegerEdit = ({value, onChange, options, immutable, name, id}) => {
  const {
    minValue,
    maxValue,
    format,
    allowLeadingZeros
  } = options || {}

  const handleChange = ({value, floatValue}) => {
    let newValue = allowLeadingZeros ? value : floatValue
    if (newValue === undefined) {
      newValue = null
    }
    onChange(newValue)
  }

  const isAllowed = ({floatValue}) =>
    !((maxValue && floatValue > maxValue) || (minValue && floatValue < minValue))

  return (
    <StyledEditableWrapper immutable={immutable}>
      <StyledNumberEdit
        isAllowed={isAllowed}
        allowNegative={true}
        decimalScale={0}
        disabled={immutable}
        id={id}
        name={name}
        onValueChange={handleChange}
        value={value}
        allowLeadingZeros={allowLeadingZeros}
        format={format}
      />
    </StyledEditableWrapper>
  )
}

IntegerEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  id: PropTypes.string,
  intl: PropTypes.object,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    format: PropTypes.string,
    allowLeadingZeros: PropTypes.bool
  })
}

export default react.Debouncer(IntegerEdit, 800)
