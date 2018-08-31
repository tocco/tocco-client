import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const SingleSelectFormatter = props => (
  <Typography.Span>{props.value.display}</Typography.Span>
)

SingleSelectFormatter.propTypes = {
  value: PropTypes.object
}

export default SingleSelectFormatter
