import React from 'react'

const HtmlFormatter = props => {
  const content = props.value
  if (!content) {
    return <div/>
  }

  const markup = {
    __html: content
  }

  return (
    <div dangerouslySetInnerHTML={markup}/>
  )
}

HtmlFormatter.propTypes = {
  value: React.PropTypes.string
}

export default HtmlFormatter
