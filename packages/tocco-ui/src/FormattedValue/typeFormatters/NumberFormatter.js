import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

const NumberFormatter = props => (
  <FormattedNumber
    value={props.value}
    style="decimal"
    maximumFractionDigits={0}
  />
)

NumberFormatter.propTypes = {
  value: PropTypes.number
}

export default NumberFormatter
