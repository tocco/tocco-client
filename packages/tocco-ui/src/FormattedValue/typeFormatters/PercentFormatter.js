import PropTypes from 'prop-types'
import React from 'react'

import DecimalFormatter from './DecimalFormatter'
import {Span} from '../../Typography'

const PercentFormatter = props => (
  <Span><DecimalFormatter value={props.value}/>%</Span>
)

PercentFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default PercentFormatter
