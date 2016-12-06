import React from 'react'

// {"username":"ek"}
const LoginFormatter = props => (
  <span>{props.value.username}</span>
)

LoginFormatter.propTypes = {
  value: React.PropTypes.object.isRequired
}

export default LoginFormatter

