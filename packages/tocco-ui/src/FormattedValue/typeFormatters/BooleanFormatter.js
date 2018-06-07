import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../../Icon'

const BooleanFormatter = props => {
  return (
    <Icon icon={props.value ? 'fa-check' : 'fa-times'}/>
  )
}

BooleanFormatter.propTypes = {
  value: PropTypes.bool
}

export default BooleanFormatter
