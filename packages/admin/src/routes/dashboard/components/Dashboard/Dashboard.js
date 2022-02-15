import PropTypes from 'prop-types'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import DashboardApp from 'tocco-dashboard/src/main'
import {Breadcrumbs} from 'tocco-ui'

import navigationStrategy from '../../../entities/utils/navigationStrategy'
import {StyledDashboardWrapper, StyledWrapper, StyledBreadcrumbs} from './StyledComponents'

const Dashboard = ({emitAction, intl}) => {
  const msg = id => intl.formatMessage({id})
  const navigate = useNavigate()

  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <Breadcrumbs currentView={{display: msg('client.admin.dashboard'), title: 'Tocco'}} pathPrefix="/dashboard" />
      </StyledBreadcrumbs>
      <StyledDashboardWrapper>
        <DashboardApp emitAction={emitAction} navigationStrategy={navigationStrategy(navigate)} />
      </StyledDashboardWrapper>
    </StyledWrapper>
  )
}

Dashboard.propTypes = {
  intl: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default React.memo(Dashboard, () => true)
