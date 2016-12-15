import React from 'react'

const BooleanFormatter = props => {
  if (typeof props.value === 'undefined') {
    return <span/>
  }

  const icon = props.value ? 'glyphicon-ok' : 'glyphicon-remove'

  return (
    <span className={`glyphicon ${icon}`} aria-hidden="true"/>
  )
}

BooleanFormatter.propTypes = {
  value: React.PropTypes.bool
}

export default BooleanFormatter
