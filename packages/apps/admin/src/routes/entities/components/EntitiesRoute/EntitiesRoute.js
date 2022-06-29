import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {errorLogging} from 'tocco-app-extensions'

import DashboardRoute from '../../../dashboard/components/Dashboard/DashboardContainer'
import Action from '../../subroutes/action'
import Entity from '../../subroutes/entity'
import {currentViewPropType} from '../../utils/propTypes'
import Breadcrumbs from '../Breadcrumbs'
import ErrorView from '../ErrorView'
import {StyledWrapper, StyledBreadcrumbs, StyledContent} from './StyledComponents'

const EntitiesRoute = ({match, history, loadCurrentRoute, currentViewInfo}) => {
  const location = history.location

  useEffect(() => {
    loadCurrentRoute(location)
  }, [location, loadCurrentRoute])

  const content = currentViewInfo?.error ? (
    <ErrorView history={history} />
  ) : (
    <Switch>
      <Route path={`${match.url}/action/:actionId`} component={Action} />
      <Route path={`${match.url}/:entity`} component={Entity} />
      <Route exact path={match.url} component={DashboardRoute} />
    </Switch>
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
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentViewInfo: currentViewPropType
}

export default EntitiesRoute
