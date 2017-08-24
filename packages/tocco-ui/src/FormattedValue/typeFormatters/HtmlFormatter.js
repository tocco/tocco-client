import PropTypes from 'prop-types'
import React from 'react'

const HtmlFormatter = props => <div dangerouslySetInnerHTML={{__html: props.value}}/>

HtmlFormatter.propTypes = {
  value: PropTypes.string.isRequired
}

export default HtmlFormatter
