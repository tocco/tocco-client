import React from 'react'
import PropTypes from 'prop-types'

import ToccoLogo from '../../../../assets/tocco_red.svg'
import {StyledDashBoardWrapper, StyledSlogan, StyledLogo, StyledTitle} from './StyledComponents'

const Dashboard = () => {
  const packageJson = require('../../../../../package')
  return (
    <StyledDashBoardWrapper>
      <StyledSlogan>
        <StyledLogo src={ToccoLogo} alt="tocco-logo" height="53.34" width="580"/>
        <StyledTitle>beta v{packageJson.version}</StyledTitle>
      </StyledSlogan>
    </StyledDashBoardWrapper>
  )
}

Dashboard.propTypes = {
  match: PropTypes.object
}

export default React.memo(Dashboard, () => true)
