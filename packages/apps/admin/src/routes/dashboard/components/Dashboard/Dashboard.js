import PropTypes from 'prop-types'
import React from 'react'
import {errorLogging} from 'tocco-app-extensions'
import DashboardApp from 'tocco-dashboard/src/main'
import {Breadcrumbs} from 'tocco-ui'

import navigationStrategy from '../../../entities/utils/navigationStrategy'
import {StyledDashboardWrapper, StyledWrapper, StyledBreadcrumbs} from './StyledComponents'

const Dashboard = ({match, history, emitAction, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <errorLogging.ErrorBoundary>
          <Breadcrumbs
            currentView={{display: msg('client.admin.dashboard'), title: 'Tocco', type: 'home'}}
            pathPrefix="/dashboard"
          />
        </errorLogging.ErrorBoundary>
      </StyledBreadcrumbs>
      <StyledDashboardWrapper>
        <DashboardApp emitAction={emitAction} navigationStrategy={navigationStrategy(history, match)} />
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
