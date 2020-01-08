import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const StringFormatter = props => (
  <Typography.Span breakWords={props.breakWords}>
    {props.value.toString()}
  </Typography.Span>
)

StringFormatter.propTypes = {
  value: PropTypes.any,
  breakWords: PropTypes.bool
}

export default StringFormatter
