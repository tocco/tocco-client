import PropTypes from 'prop-types'
import {react} from 'tocco-util'

import {StyledEditableWrapper} from '../StyledEditableValue'
import {isAllowedValue, checkValueRange} from './NumberEdit'
import StyledNumberEdit from './StyledNumberEdit'

const IntegerEdit = ({value, onChange, options, immutable, name, id, placeholder}) => {
  const {minValue, maxValue, format, allowLeadingZeros} = options || {}

  const handleChange = ({value: changedValue, floatValue}) => {
    let newValue = allowLeadingZeros ? changedValue : floatValue
    if (newValue === undefined) {
      newValue = null
    }
    if (checkValueRange(minValue, maxValue, floatValue)) {
      onChange(newValue)
    }
  }

  return (
    <StyledEditableWrapper immutable={immutable}>
      <StyledNumberEdit
        isAllowed={isAllowedValue(minValue, maxValue)}
        allowNegative={true}
        decimalScale={0}
        disabled={immutable}
        id={id}
        name={name}
        onValueChange={handleChange}
        value={value}
        allowLeadingZeros={allowLeadingZeros}
        format={format}
        placeholder={placeholder}
      />
    </StyledEditableWrapper>
  )
}

IntegerEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
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
