import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

const InfoBoxHtmlFieldContent = ({content}) => {
  const {text} = content
  return <FormattedValue type="html" value={text}/>
}

InfoBoxHtmlFieldContent.propTypes = {
  content: PropTypes.object.isRequired
}

export default InfoBoxHtmlFieldContent
