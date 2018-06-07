import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import {Span} from '../../Typography'

const NumberFormatter = props => (
  <Span>
    <FormattedNumber
      value={props.value}
      style="decimal"
      maximumFractionDigits={0}
    />
  </Span>
)

NumberFormatter.propTypes = {
  value: PropTypes.number
}

export default NumberFormatter
