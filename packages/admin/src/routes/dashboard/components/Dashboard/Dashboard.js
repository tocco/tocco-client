import React from 'react'
import PropTypes from 'prop-types'
import DashboardApp from 'tocco-dashboard/src/main'

import {StyledDashBoardWrapper} from './StyledComponents'
import navigationStrategy from '../../../entities/utils/navigationStrategy'

const Dashboard = ({match, history, emitAction}) => {
  return (
    <StyledDashBoardWrapper>
      <DashboardApp
        emitAction={emitAction}
        navigationStrategy={navigationStrategy(history, match)}
      />
    </StyledDashBoardWrapper>
  )
}

Dashboard.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default React.memo(Dashboard, () => true)
