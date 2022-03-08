import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import styled from 'styled-components'

import Action from '../../subroutes/action'
import Entity from '../../subroutes/entity'
import Overview from '../../subroutes/overview'
import {currentViewPropType} from '../../utils/propTypes'
import Breadcrumbs from '../Breadcrumbs'
import ErrorView from '../ErrorView'

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'breadcrumbs'
    'content';
  height: 100%;
  width: 100%;
`

const StyledContent = styled.div`
  grid-area: content;
  overflow: hidden;
`

const StyledBreadcrumbs = styled.div`
  grid-area: breadcrumbs;
`

const EntitiesRoute = ({match, history, loadCurrentRoute, currentViewInfo}) => {
  const location = history.location

  useEffect(() => {
    loadCurrentRoute(location)
  }, [location, loadCurrentRoute])

  const content =
    currentViewInfo && currentViewInfo.error ? (
      <ErrorView history={history} />
    ) : (
      <Switch>
        <Route path={`${match.url}/action/:actionId`} component={Action} />
        <Route path={`${match.url}/:entity`} component={Entity} />
        <Route exact path={match.url} component={Overview} />
      </Switch>
    )

  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <Breadcrumbs />
      </StyledBreadcrumbs>
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
