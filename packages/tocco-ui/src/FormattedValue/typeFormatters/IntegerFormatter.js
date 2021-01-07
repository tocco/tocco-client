import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const IntegerFormatter = props =>
  <Typography.Span breakWords={props.breakWords}>
    {props.value.toString()}
  </Typography.Span>

IntegerFormatter.propTypes = {
  value: PropTypes.number,
  breakWords: PropTypes.bool
}

export default IntegerFormatter
