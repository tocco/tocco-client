import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const MoneyFormatter = props => (
  <Typography.Span breakWords={props.breakWords}>
    <FormattedNumber
      value={props.value}
      style="decimal"
      minimumFractionDigits={2}
    />
  </Typography.Span>
)

MoneyFormatter.propTypes = {
  value: PropTypes.number,
  breakWords: PropTypes.bool
}

export default MoneyFormatter
