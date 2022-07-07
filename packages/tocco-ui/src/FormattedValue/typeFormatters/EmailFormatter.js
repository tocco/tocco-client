import PropTypes from 'prop-types'
import React from 'react'

import Link from '../../Link'
import Typography from '../../Typography'

const EmailFormatter = props => (
  <Typography.Span breakWords={props.breakWords}>
    <Link onClick={e => e.stopPropagation()} href={`mailto:${props.value.toString()}`}>
      {props.value.toString()}
    </Link>
  </Typography.Span>
)

EmailFormatter.propTypes = {
  value: PropTypes.any,
  breakWords: PropTypes.bool
}

export default EmailFormatter
