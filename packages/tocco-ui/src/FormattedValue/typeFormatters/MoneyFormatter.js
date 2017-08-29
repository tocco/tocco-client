import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

const MoneyFormatter = props => (
  <FormattedNumber
    value={props.value}
    style="decimal"
    minimumFractionDigits={2}
  />
)

MoneyFormatter.propTypes = {
  value: PropTypes.number
}

export default MoneyFormatter
