import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const SingleSelectFormatter = ({value, options = {}}) => {
  const display = <Typography.Span>{value.display}</Typography.Span>

  return options.linkFactory ? options.linkFactory(value.key, display) : display
}

SingleSelectFormatter.propTypes = {
  value: PropTypes.shape({
    display: PropTypes.string,
    key: PropTypes.string
  }),
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  })
}

export default SingleSelectFormatter
