import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import React from 'react'
import {react} from 'tocco-util'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledNumberEdit from './StyledNumberEdit'

const IntegerEdit = ({value, onChange, options, immutable, name, id}) => {
  const {
    minValue,
    maxValue
  } = options || {}

  const handleChange = ({floatValue}) => {
    onChange(floatValue)
  }

  const isAllowed = ({floatValue}) =>
    !((maxValue && floatValue > maxValue) || (minValue && floatValue < minValue))

  return (
    <StyledEditableWrapper immutable={immutable}>
      <StyledNumberEdit
        isAllowed={isAllowed}
        allowNegative={false}
        decimalScale={0}
        disabled={immutable}
        id={id}
        name={name}
        onValueChange={handleChange}
        value={value}
      />
    </StyledEditableWrapper>
  )
}

IntegerEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  intl: intlShape,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    minValue: PropTypes.number,
    maxValue: PropTypes.number
  })
}

export default react.Debouncer(IntegerEdit, 800)
