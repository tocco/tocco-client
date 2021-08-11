import PropTypes from 'prop-types'
import React from 'react'

import Link from '../../Link'

const UrlFormatter = props =>
    <Link
      onClick={e => {
        e.stopPropagation()
      }}
      href={props.value}
      target="_blank"
      rel="noopener noreferrer"
      label={props.value}
      breakWords={props.breakWords}
    />

UrlFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default UrlFormatter
