import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import {Span} from '../../Typography'

const MoneyFormatter = props => (
  <Span>
    <FormattedNumber
      value={props.value}
      style="decimal"
      minimumFractionDigits={2}
    />
  </Span>
)

MoneyFormatter.propTypes = {
  value: PropTypes.number
}

export default MoneyFormatter
