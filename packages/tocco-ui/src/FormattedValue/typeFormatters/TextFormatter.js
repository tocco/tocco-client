import PropTypes from 'prop-types'
import React from 'react'

const TextFormatter = props => (
  <span style={{whiteSpace: 'pre-wrap'}}>{props.value}</span>
)

TextFormatter.propTypes = {
  value: PropTypes.string
}

export default TextFormatter
