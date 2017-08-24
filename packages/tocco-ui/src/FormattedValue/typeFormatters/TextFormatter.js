import PropTypes from 'prop-types'
import React from 'react'

const TextFormatter = props => (
  <span>
    {
      props.value.split('\\n').map((b, idx) => (
        <div key={idx}>{b}</div>
      ))
    }
  </span>
)

TextFormatter.propTypes = {
  value: PropTypes.string
}

export default TextFormatter
