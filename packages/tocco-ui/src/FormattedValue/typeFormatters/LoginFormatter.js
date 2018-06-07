import PropTypes from 'prop-types'
import React from 'react'

import {Span} from '../../Typography'

const LoginFormatter = props => (
  <Span>{props.value.username}</Span>
)

LoginFormatter.propTypes = {
  value: PropTypes.object.isRequired
}

export default LoginFormatter
