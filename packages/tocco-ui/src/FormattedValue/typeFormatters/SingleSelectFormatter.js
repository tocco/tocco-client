import PropTypes from 'prop-types'
import React from 'react'
import {js} from 'tocco-util'

import Typography from '../../Typography'

const SingleSelectFormatter = ({value, options, breakWords}) => {
  value = js.getOrFirst(value)
  const display = <Typography.Span breakWords={breakWords}>{value.display}</Typography.Span>

  return options && options.linkFactory
    ? <span onClick={e => e.stopPropagation()}>{options.linkFactory(value.key, display)}</span>
    : display
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
  }),
  breakWords: PropTypes.bool
}

export default SingleSelectFormatter
