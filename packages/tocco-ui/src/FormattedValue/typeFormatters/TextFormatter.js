import PropTypes from 'prop-types'
import React from 'react'

import {P} from '../../Typography'

const TextFormatter = props => {
  return props.value.split('\n').map((line, index) => <P key={index}>{line}</P>)
}

TextFormatter.propTypes = {
  value: PropTypes.string
}

export default TextFormatter
