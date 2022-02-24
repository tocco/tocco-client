import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {errorLogging} from 'tocco-app-extensions'

import DashboardRoute from '../../../dashboard/components/Dashboard/DashboardContainer'
import Action from '../../subroutes/action'
import Entity from '../../subroutes/entity'
import {currentViewPropType} from '../../utils/propTypes'
import Breadcrumbs from '../Breadcrumbs'
import ErrorView from '../ErrorView'
import {StyledWrapper, StyledBreadcrumbs, StyledContent} from './StyledComponents'

const EntitiesRoute = ({loadCurrentRoute, currentViewInfo}) => {
  const location = useLocation()

  useEffect(() => {
    loadCurrentRoute(location)
  }, [location, loadCurrentRoute])

  const content = currentViewInfo?.error ? (
    <ErrorView location={location} />
  ) : (
    <Routes>
      <Route path="action/:actionId" element={<Action location={location} />} />
      <Route path=":entity/*" element={<Entity />} />
      <Route exact path="/" element={<DashboardRoute />} />
    </Routes>
  )

  return (
    <StyledWrapper>
      <errorLogging.ErrorBoundary>
        <StyledBreadcrumbs>
          <Breadcrumbs />
        </StyledBreadcrumbs>
      </errorLogging.ErrorBoundary>
      <StyledContent>{content}</StyledContent>
    </StyledWrapper>
  )
}

EntitiesRoute.propTypes = {
  loadCurrentRoute: PropTypes.func.isRequired,
  currentViewInfo: currentViewPropType
}

export default EntitiesRoute
