import React from 'react'

const DateFormatter = props => {
  if (typeof props.value === 'undefined') {
    return <span/>
  }

  const icon = props.value ? 'glyphicon-ok' : 'glyphicon-remove'

  return (
    <span className={`glyphicon ${icon}`} aria-hidden="true"/>
  )
}

DateFormatter.propTypes = {
  value: React.PropTypes.boolean
}

export default DateFormatter
