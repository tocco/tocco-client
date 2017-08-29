import PropTypes from 'prop-types'
import React from 'react'

const StringFormatter = props => (
  <span>{props.value.toString()}</span>
)

StringFormatter.propTypes = {
  value: PropTypes.any
}

export default StringFormatter
