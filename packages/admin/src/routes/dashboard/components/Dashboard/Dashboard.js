import React from 'react'
import PropTypes from 'prop-types'
import {Typography, StyledH3, theme} from 'tocco-ui'
import styled from 'styled-components'

import ToccoLogo from '../../../../assets/tocco_red.svg'

const StyledDashBoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color('backgroundBody')};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 568px) {
    justify-content: center;
    align-items: center;
  }
`

const StyledSlogan = styled.div`
  max-width: 900px;
  width: 100%;
  height: 100px;
  text-align: right;
  margin-bottom: 150px;
  margin-right: 100px;
  margin-left: 100px;

  @media (max-width: 568px) {
    margin-right: 25px;
    margin-left: 25px;
    margin-bottom: 0;
  }

  ${/* sc-selector */StyledH3} {
    font-size: 3rem;
    color: ${theme.color('primary')};
  }
`

const Dashboard = () => {
  const packageJson = require('../../../../../package')
  return <StyledDashBoardWrapper>
    <StyledSlogan>
      <img src={ToccoLogo} alt="tocco-logo"/>
      <Typography.H3>beta v{packageJson.version}</Typography.H3>
    </StyledSlogan>
  </StyledDashBoardWrapper>
}

Dashboard.propTypes = {
  match: PropTypes.object
}

export default React.memo(Dashboard, () => true)
