import React from 'react'
import {FormattedNumber} from 'react-intl'

const NumberFormatter = props => {
  const content = props.value
  if (typeof content !== 'undefined' && content !== null) {
    return (
      <FormattedNumber
        value={content}
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
