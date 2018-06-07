import PropTypes from 'prop-types'
import React from 'react'

import {Span} from '../../Typography'

const MultiSelectFormatter = props => (
  <Span>{props.value.map(v => v.display).join(', ')}</Span>
)

MultiSelectFormatter.propTypes = {
  value: PropTypes.array
}

export default MultiSelectFormatter
