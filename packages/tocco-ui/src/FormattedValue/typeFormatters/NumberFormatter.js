import React from 'react'
import {FormattedNumber} from 'react-intl'

const NumberFormatter = props => {
  if (props.value) {
    return (
      <FormattedNumber
        value={props.value}
        style="decimal"
        maximumFractionDigits={0}
      />
    )
  }
}

NumberFormatter.propTypes = {
  value: React.PropTypes.number
}

export default NumberFormatter
