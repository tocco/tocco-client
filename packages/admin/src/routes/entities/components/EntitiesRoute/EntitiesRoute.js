import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
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

const EntitiesRoute = ({loadCurrentRoute, currentViewInfo}) => {
  const location = useLocation()

  useEffect(() => {
    loadCurrentRoute(location)
  }, [location, loadCurrentRoute])

  const content =
    currentViewInfo && currentViewInfo.error ? (
      <ErrorView location={location} />
    ) : (
      <Routes>
        <Route path="action/:actionId" element={<Action location={location} />} />
        <Route path=":entity/*" element={<Entity />} />
        <Route exact path="/" element={<Overview />} />
      </Routes>
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
  currentViewInfo: currentViewPropType
}

export default EntitiesRoute
