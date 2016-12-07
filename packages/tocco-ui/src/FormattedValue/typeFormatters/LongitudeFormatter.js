import React from 'react'
import {FormattedNumber} from 'react-intl'

const LongitudeFormatter = props => {
  const number = props.value.value

  return (
    <FormattedNumber
      value={number}
      style="decimal"
      maximumFractionDigits={17}
    />
  )
}

LongitudeFormatter.propTypes = {
  value: React.PropTypes.object
}

export default LongitudeFormatter
