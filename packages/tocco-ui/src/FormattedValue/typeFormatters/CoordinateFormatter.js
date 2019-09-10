import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const CoordinateFormatter = ({value}) => (
  <Typography.Span>
    <FormattedNumber
      value={value}
      style="decimal"
      maximumFractionDigits={15}
    />
  </Typography.Span>
)

CoordinateFormatter.propTypes = {
  value: PropTypes.number
}

export default CoordinateFormatter
