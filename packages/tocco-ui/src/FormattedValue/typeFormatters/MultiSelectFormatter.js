import PropTypes from 'prop-types'
import React from 'react'

const MultiSelectFormatter = props => (
  <span>{props.value.map(v => v.display).join(', ')}</span>
)

MultiSelectFormatter.propTypes = {
  value: PropTypes.array
}

export default MultiSelectFormatter
