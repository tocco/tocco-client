import PropTypes from 'prop-types'
import React from 'react'
import {js} from 'tocco-util'

import Typography from '../../Typography'

const SingleSelectFormatter = ({value, options}) => {
  value = js.getOrFirst(value)

  const display = <Typography.Span>{value.display}</Typography.Span>

  return options && options.linkFactory ? options.linkFactory(value.key, display) : display
}

const valuePropType = PropTypes.shape({
  display: PropTypes.string,
  key: PropTypes.string
})

SingleSelectFormatter.propTypes = {
  value: PropTypes.oneOfType([
    valuePropType,
    PropTypes.arrayOf(valuePropType)
  ]),
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  })
}

export default SingleSelectFormatter
