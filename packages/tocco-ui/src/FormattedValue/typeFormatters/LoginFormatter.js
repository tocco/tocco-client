import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const LoginFormatter = props => (
  <Typography.Span>{props.value.username}</Typography.Span>
)

LoginFormatter.propTypes = {
  value: PropTypes.object.isRequired
}

export default LoginFormatter
