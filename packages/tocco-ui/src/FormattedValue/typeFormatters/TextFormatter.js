import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const TextFormatter = props => {
  return props.value.split('\n').map((line, index) =>
    <Typography.P key={index}>{line}</Typography.P>)
}

TextFormatter.propTypes = {
  value: PropTypes.string
}

export default TextFormatter
