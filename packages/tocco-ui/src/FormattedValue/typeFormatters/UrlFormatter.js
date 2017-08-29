import PropTypes from 'prop-types'
import React from 'react'

const UrlFormatter = props => (
  <span><a href={props.value}>{props.value}</a></span>
)

UrlFormatter.propTypes = {
  value: PropTypes.string
}

export default UrlFormatter
