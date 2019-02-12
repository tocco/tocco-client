import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const StringFormatter = props => (
  <Typography.Span>{props.value.toString()}</Typography.Span>
)

StringFormatter.propTypes = {
  value: PropTypes.any
}

export default StringFormatter
