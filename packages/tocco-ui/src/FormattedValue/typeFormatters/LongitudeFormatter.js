import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const LongitudeFormatter = props => {
  const number = props.value.value

  return (
    <Typography.Span>
      <FormattedNumber
        value={number}
        style="decimal"
        maximumFractionDigits={15}
      />
    </Typography.Span>
  )
}

LongitudeFormatter.propTypes = {
  value: PropTypes.object
}

export default LongitudeFormatter
