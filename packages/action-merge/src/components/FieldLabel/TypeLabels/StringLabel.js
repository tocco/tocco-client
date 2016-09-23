import React from 'react'

const StringLabel = props => {
  var content = props.value || ''

  return (
    <span>{content}</span>
  )
}

StringLabel.propTypes = {
  value: React.PropTypes.node
}

export default StringLabel
