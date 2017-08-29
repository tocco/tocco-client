import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

const LongitudeFormatter = props => {
  const number = props.value.value

  return (
    <FormattedNumber
      value={number}
      style="decimal"
      maximumFractionDigits={15}
    />
  )
}

LongitudeFormatter.propTypes = {
  value: PropTypes.object
}

export default LongitudeFormatter
