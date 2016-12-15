import React from 'react'

const LoginFormatter = props => (
  <span>{props.value.username}</span>
)

LoginFormatter.propTypes = {
  value: React.PropTypes.object.isRequired
}

export default LoginFormatter

