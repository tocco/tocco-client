import React from 'react'

const StringFormatter = props => {
  const content = props.value || ''

  return (
    <span>{content}</span>
  )
}

StringFormatter.propTypes = {
  value: React.PropTypes.node
}

export default StringFormatter
