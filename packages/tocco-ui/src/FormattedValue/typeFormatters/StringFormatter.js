import React from 'react'

const StringFormatter = props => (
  <span>{props.value.toString()}</span>
)

StringFormatter.propTypes = {
  value: React.PropTypes.any
}

export default StringFormatter
