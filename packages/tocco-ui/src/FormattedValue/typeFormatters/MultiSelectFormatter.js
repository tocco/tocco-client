import React from 'react'

const MultiSelectFormatter = props => (
  <span>{props.value.map(v => v.display).join(', ')}</span>
)

MultiSelectFormatter.propTypes = {
  value: React.PropTypes.array
}

export default MultiSelectFormatter
