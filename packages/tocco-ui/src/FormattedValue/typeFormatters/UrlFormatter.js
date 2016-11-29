import React from 'react'

const UrlFormatter = props => {
  if (typeof props.value === 'undefined' || props.value === '') {
    return <span/>
  }

  return (
    <span><a href={props.value}>{props.value}</a></span>
  )
}

UrlFormatter.propTypes = {
  value: React.PropTypes.string
}

export default UrlFormatter
