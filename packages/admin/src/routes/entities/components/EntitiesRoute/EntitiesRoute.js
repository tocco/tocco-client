import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {StyledScrollbar, scale} from 'tocco-ui'

import Overview from '../../subroutes/overview'
import Entity from '../../subroutes/entity'
import Action from '../../subroutes/action'
import Breadcrumbs from '../Breadcrumbs'

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto  1fr;
  grid-template-areas:
    'breadcrumbs'
    'content';
  height: 100%;
  width: 100%;
`

const StyledContent = styled.div`
  grid-area: content;
  overflow-x: hidden;
  padding-right: ${scale.space(-1)};
  ${StyledScrollbar}
`

const StyledBreadcrumbs = styled.div`
  grid-area: breadcrumbs;
`

const EntitiesRoute = ({match, history, loadCurrentViewInfo}) => {
  useEffect(() => { loadCurrentViewInfo(history.location) }, [])

  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <Breadcrumbs/>
      </StyledBreadcrumbs>
      <StyledContent>
        <Switch>
          <Route
            path={`${match.url}/action/:actionId`}
            component={Action}
          />
          <Route
            path={`${match.url}/:entity`}
            component={Entity}
          />
          <Route exact path={match.url} component={Overview}/>
        </Switch>
      </StyledContent>
    </StyledWrapper>
  )
}

EntitiesRoute.propTypes = {
  loadCurrentViewInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default EntitiesRoute
