import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const NumberFormatter = props => (
  <Typography.Span>
    <FormattedNumber
      value={props.value}
      style="decimal"
      maximumFractionDigits={0}
    />
  </Typography.Span>
)

NumberFormatter.propTypes = {
  value: PropTypes.number
}

export default NumberFormatter
