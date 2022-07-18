import PropTypes from 'prop-types'
import React from 'react'

import Link from '../../Link'

const EmailFormatter = props => (
  <Link
    onClick={e => e.stopPropagation()}
    href={`mailto:${props.value.toString()}`}
    label={props.value.toString()}
    breakWords={props.breakWords}
  />
)

EmailFormatter.propTypes = {
  value: PropTypes.any,
  breakWords: PropTypes.bool
}

export default EmailFormatter
