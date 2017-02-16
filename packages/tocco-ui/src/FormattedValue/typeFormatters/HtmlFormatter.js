import React from 'react'

const HtmlFormatter = props => <div dangerouslySetInnerHTML={{__html: props.value}}/>

HtmlFormatter.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default HtmlFormatter
