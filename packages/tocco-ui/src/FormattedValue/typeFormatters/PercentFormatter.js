import PropTypes from 'prop-types'
import React from 'react'

import DecimalFormatter from './DecimalFormatter'
import Typography from '../../Typography'

const PercentFormatter = props => (
  <Typography.Span><DecimalFormatter value={props.value}/>%</Typography.Span>
)

PercentFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default PercentFormatter
