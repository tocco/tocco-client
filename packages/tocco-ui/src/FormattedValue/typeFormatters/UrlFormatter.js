import React from 'react'

const UrlFormatter = props => (
  <span><a href={props.value}>{props.value}</a></span>
)

UrlFormatter.propTypes = {
  value: React.PropTypes.string
}

export default UrlFormatter
