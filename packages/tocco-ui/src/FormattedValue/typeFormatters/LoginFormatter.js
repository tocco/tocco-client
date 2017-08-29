import PropTypes from 'prop-types'
import React from 'react'

const LoginFormatter = props => (
  <span>{props.value.username}</span>
)

LoginFormatter.propTypes = {
  value: PropTypes.object.isRequired
}

export default LoginFormatter
