import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const DecimalFormatter = props => {
  return (
    <Typography.Span>
      <FormattedNumber
        value={props.value}
        style="decimal"
        minimumFractionDigits={2}
      />
    </Typography.Span>
  )
}

DecimalFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default DecimalFormatter
