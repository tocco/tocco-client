import React from 'react'

const StringLabel = props => {
  const content = props.value || ''

  return (
    <span>{content}</span>
  )
}

StringLabel.propTypes = {
  value: React.PropTypes.node
}

export default StringLabel
