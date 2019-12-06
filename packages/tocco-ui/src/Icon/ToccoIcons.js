import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

const icons = {
  logo: style => (
    <svg height={_get(style, 'fontSize', 20)} {...style} aria-hidden="true" role="img"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d={`M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 
            8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z`}
      />
    </svg>
  ),
  office: style => {
    return <svg height={_get(style, 'fontSize', 20)} {...style} aria-hidden="true" role="img"
      enableBackground="new 0 0 2075 2499.8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2075 2499.8">
      <path
        fill="currentColor"
        d={`m0 2016.6v-1519.8l1344.4-496.8 730.6 233.7v2045.9l-730.6 220.3-1344.4-483.3 1344.4 
            161.8v-1769.2l-876.8 204.6v1198.3z`}
      />
    </svg>
  }
}

const ToccoIcons = ({icon, style}) =>
  icons[icon](style)

ToccoIcons.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default ToccoIcons
