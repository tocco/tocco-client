import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import {StyledInfoBoxWrapper} from './StyledComponents'
import InfoBoxContent from './InfoBoxContent'

const InfoBox = ({id, label, height, content, ...props}) => (
  <StyledInfoBoxWrapper {...props} height={height}>
    <Typography.H3>{label}</Typography.H3>
    <InfoBoxContent id={id} content={content}/>
  </StyledInfoBoxWrapper>
)

InfoBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired
}

export default InfoBox
