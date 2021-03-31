import React, {useEffect, useReducer} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, useLocation} from 'react-router-dom'
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

const DocsBrowser = ({
  history,
  searchMode,
  navigationStrategy,
  setSearchMode,
  loadBreadcrumbs,
  emitAction,
  openFileDialog
}) => {
  // eslint-disable-next-line no-unused-vars
  const [docsViewNumber, forceDocsViewUpdate] = useReducer(x => x + 1, 0)

  const location = useLocation()

  useEffect(() => {
    if (searchMode === true && location.pathname !== '/docs/search') {
      // this means the user clicked on the root item in the breadcrumbs navigation or clicked on a search result item
      // -> reset search mode to false and rerender the <DocsView>
      setSearchMode(false)
      forceDocsViewUpdate()
    }

    loadBreadcrumbs(location.pathname)
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
            render={({match}) => (
              <DocumentView
                match={match}
                history={history}
                navigationStrategy={navigationStrategy}
              />
            )}
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
                navigationStrategy={navigationStrategy}
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

DocsBrowser.propTypes = {
  loadBreadcrumbs: PropTypes.func.isRequired,
  setSearchMode: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  searchMode: PropTypes.bool.isRequired,
  navigationStrategy: PropTypes.object
}

export default DocsBrowser
