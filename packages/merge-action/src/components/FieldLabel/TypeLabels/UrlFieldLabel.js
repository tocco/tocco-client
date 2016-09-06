import React from 'react'

const UrlFieldLabel = props => {
 var content = props.value || ''

  return (
    <span><a href={content}>{content}</a></span>
  )
}

UrlFieldLabel.propTypes = {
  value: React.PropTypes.string
}

export default UrlFieldLabel
