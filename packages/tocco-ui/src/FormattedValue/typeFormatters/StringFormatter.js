import PropTypes from 'prop-types'
import React from 'react'

import {Span} from '../../Typography'

const StringFormatter = props => (
  <Span>{props.value.toString()}</Span>
)

StringFormatter.propTypes = {
  value: PropTypes.any
}

export default StringFormatter
