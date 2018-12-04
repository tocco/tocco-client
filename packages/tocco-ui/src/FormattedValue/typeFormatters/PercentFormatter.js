import PropTypes from 'prop-types'
import React from 'react'

import NumberFormatter from './NumberFormatter'
import Typography from '../../Typography'

const PercentFormatter = props => (
  <Typography.Span><NumberFormatter value={props.value}/>%</Typography.Span>
)

PercentFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default PercentFormatter
