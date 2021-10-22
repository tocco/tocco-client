import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

import {StyledInfoBoxContentWrapper} from './StyledComponents'

const InfoBoxHtmlFieldContent = ({content}) => {
  const {text} = content
  return (
    <StyledInfoBoxContentWrapper scrollable>
      <FormattedValue type="html" value={text}/>
    </StyledInfoBoxContentWrapper>
  )
}

InfoBoxHtmlFieldContent.propTypes = {
  content: PropTypes.object.isRequired
}

export default InfoBoxHtmlFieldContent
