import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

const DecimalFormatter = props => {
  return (
    <FormattedNumber
      value={props.value}
      style="decimal"
      minimumFractionDigits={2}
    />
  )
}

DecimalFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default DecimalFormatter
