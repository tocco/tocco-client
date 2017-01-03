import React from 'react'

const StringFormatter = props => {
  const content = props.value
  if (typeof content === 'undefined' || content === null) {
    return <span/>
  }

  return (
    <span>{content}</span>
  )
}

StringFormatter.propTypes = {
  value: React.PropTypes.node
}

export default StringFormatter
