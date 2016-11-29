import React from 'react'

const UrlFormatter = props => {
  const content = props.value || ''

  return (
    <span><a href={content}>{content}</a></span>
  )
}

UrlFormatter.propTypes = {
  value: React.PropTypes.string
}

export default UrlFormatter
