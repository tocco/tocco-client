import PropTypes from 'prop-types'
import React from 'react'

const BooleanFormatter = props => {
  const icon = props.value ? 'glyphicon-ok' : 'glyphicon-remove'

  return (
    <span className={`glyphicon ${icon}`} aria-hidden="true"/>
  )
}

BooleanFormatter.propTypes = {
  value: PropTypes.bool
}

export default BooleanFormatter
