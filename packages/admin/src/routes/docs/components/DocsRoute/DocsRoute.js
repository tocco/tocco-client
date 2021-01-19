import React, {useEffect, useReducer} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import styled from 'styled-components'
import {StyledScrollbar, scale} from 'tocco-ui'

import DocsView from '../DocsView'
import DocumentView from '../DocumentView'
import Breadcrumbs from '../../containers/BreadcrumbsContainer'

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

const DocsRoute = ({history, searchMode, setSearchMode, loadBreadcrumbs, emitAction, openFileDialog}) => {
  // eslint-disable-next-line no-unused-vars
  const [docsViewNumber, forceDocsViewUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    if (searchMode === true && history.location.pathname === '/docs/') {
      // this means the user clicked on the root item in the breadcrumbs navigation
      // -> reset search mode to false and rerender the <DocsView>
      setSearchMode(false)
      forceDocsViewUpdate()
    }

    loadBreadcrumbs(history.location.pathname)
  })

  const handleSearchChange = e => {
    const hasUserChanges = e.query && e.query.hasUserChanges
    if (history.location.pathname !== '/docs/search' && hasUserChanges) {
      history.push('/docs/search')
    } else if (history.location.pathname === '/docs/search' && !hasUserChanges) {
      history.push('/docs')
    }
    setSearchMode(hasUserChanges)
  }

  const key = `docs-view-${docsViewNumber}`

  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <Breadcrumbs/>
      </StyledBreadcrumbs>
      <StyledContent>
        <Switch>
          <Route
            exact
            path={'/docs/doc/:key/detail'}
            component={DocumentView}
          />
          <Route
            exact
            path={['/docs/:model/:key/list', '/docs', '/docs/search']}
            render={({match}) => (
              <DocsView
                key={key}
                storeKey={key}
                history={history}
                match={match}
                onSearchChange={handleSearchChange}
                emitAction={emitAction}
                openFileDialog={openFileDialog}
              />)}
          />
        </Switch>
      </StyledContent>
    </StyledWrapper>
  )
}

DocsRoute.propTypes = {
  loadBreadcrumbs: PropTypes.func.isRequired,
  setSearchMode: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  searchMode: PropTypes.bool.isRequired
}

export default DocsRoute
