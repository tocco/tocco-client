import React from 'react'
import {FormattedNumber} from 'react-intl'

// {"value":0.82710405122667465,"minimum":false,"maximum":false}
const LongitudeFormatter = props => {
  const number = props.value.value

  return (
    <FormattedNumber
      value={number}
      style="decimal"
      maximumFractionDigits={20}
    />
  )
}

LongitudeFormatter.propTypes = {
  value: React.PropTypes.object
}

export default LongitudeFormatter
