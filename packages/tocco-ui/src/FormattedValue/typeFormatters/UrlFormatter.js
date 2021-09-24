import PropTypes from 'prop-types'
import React from 'react'

import Link from '../../Link'

const UrlFormatter = ({value, breakWords}) =>
  <Link
    onClick={e => {
      e.stopPropagation()
    }}
    href={value}
    target="_blank"
    rel="noopener noreferrer"
    label={value}
    breakWords={breakWords}
    neutral={false}
  />

UrlFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default UrlFormatter
