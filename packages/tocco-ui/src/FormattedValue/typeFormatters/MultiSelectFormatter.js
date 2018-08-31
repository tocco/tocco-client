import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const MultiSelectFormatter = props => (
  <Typography.Span>{props.value.map(v => v.display).join(', ')}</Typography.Span>
)

MultiSelectFormatter.propTypes = {
  value: PropTypes.array
}

export default MultiSelectFormatter
