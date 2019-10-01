import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Icon} from 'tocco-ui'
import styled from 'styled-components'

const StyledDashBoard = styled.div`
  display: flex;
  justify-content: center;
  
  div { 
      padding:  15px;
  }
`

const Dashboard = props => {
  const packageJson = require('../../../../../package')
  return <StyledDashBoard>
    <div><Icon style={{fontSize: '80px'}} icon="tocco"/></div>
    <Typography.H1>Welcome to beta v{packageJson.version}</Typography.H1>
  </StyledDashBoard>
}

Dashboard.propTypes = {
  match: PropTypes.object
}

export default Dashboard
