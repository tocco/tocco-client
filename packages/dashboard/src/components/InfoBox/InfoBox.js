import React from 'react'
import PropTypes from 'prop-types'

import {StyledInfoBoxWrapper} from './StyledComponents'

const InfoBox = ({index, ...props}) => {
  return (<StyledInfoBoxWrapper {...props}>
    <div>Nächste Geburtstage {index}</div>
  </StyledInfoBoxWrapper>)
}

InfoBox.propTypes = {
  index: PropTypes.number.isRequired
}

export default InfoBox
