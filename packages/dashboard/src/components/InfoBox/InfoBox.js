import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import {StyledInfoBoxWrapper} from './StyledComponents'

const InfoBox = ({id, label, height, ...props}) => {
  return (<StyledInfoBoxWrapper {...props}>
    <div><Typography.H2>{label} (#{id})</Typography.H2></div>
  </StyledInfoBoxWrapper>)
}

InfoBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
}

export default InfoBox
