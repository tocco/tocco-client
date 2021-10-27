import React from 'react'
import PropTypes from 'prop-types'
import DashboardApp from 'tocco-dashboard/src/main'
import {Breadcrumbs} from 'tocco-ui'

import {StyledDashboardWrapper, StyledWrapper, StyledBreadcrumbs} from './StyledComponents'
import navigationStrategy from '../../../entities/utils/navigationStrategy'

const Dashboard = ({match, history, emitAction, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <Breadcrumbs
          currentView={{display: msg('client.admin.dashboard'), title: 'Tocco'}}
          pathPrefix="/dashboard"
        />
      </StyledBreadcrumbs>
      <StyledDashboardWrapper>
        <DashboardApp
          emitAction={emitAction}
          navigationStrategy={navigationStrategy(history, match)}
        />
      </StyledDashboardWrapper>
    </StyledWrapper>
  )
}

Dashboard.propTypes = {
  intl: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default React.memo(Dashboard, () => true)
