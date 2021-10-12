import React from 'react'
import PropTypes from 'prop-types'
import DashboardApp from 'tocco-dashboard/src/main'

import {StyledDashBoardWrapper} from './StyledComponents'

const Dashboard = () => {
  return (
    <StyledDashBoardWrapper>
      <DashboardApp/>
    </StyledDashBoardWrapper>
  )
}

Dashboard.propTypes = {
  match: PropTypes.object
}

export default React.memo(Dashboard, () => true)
