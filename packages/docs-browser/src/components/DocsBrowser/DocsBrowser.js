import React, {useEffect, useReducer, useRef} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, useLocation} from 'react-router-dom'
import {withTheme} from 'styled-components'
import {theme as themeUtil} from 'tocco-ui'
import {viewPersistor} from 'tocco-util'

import DocsView from '../DocsView'
import DocumentView from '../DocumentView'
import Breadcrumbs from '../../containers/BreadcrumbsContainer'
import {StyledWrapper, StyledBreadcrumbs, StyledContent} from './StyledComponents'
import isRootLocation from '../../utils/isRootLocation'

const DocsBrowser = ({
  history,
  searchMode,
  navigationStrategy,
  setSearchMode,
  loadBreadcrumbs,
  emitAction,
  openFileDialog,
  theme,
  embedded,
  noLeftPadding
}) => {
  // eslint-disable-next-line no-unused-vars
  const [docsViewNumber, forceDocsViewUpdate] = useReducer(x => x + 1, 0)

  const location = useLocation()

  const searchModeRef = useRef(searchMode)
  searchModeRef.current = searchMode

  useEffect(() => {
    loadBreadcrumbs(location.pathname)
  })

  const resetSearchMode = () => {
    if (searchModeRef.current) {
      viewPersistor.clearPersistedViews()
      setSearchMode(false)
      loadBreadcrumbs(location.pathname)
      forceDocsViewUpdate()
    }
  }

  const handleSearchChange = e => {
    const hasUserChanges = e.query && e.query.hasUserChanges
    if (hasUserChanges) {
      setSearchMode(true)
      history.push('/docs/')
      loadBreadcrumbs(location.pathname)
    } else if (isRootLocation(history.location.pathname)) {
      resetSearchMode()
    }
  }

  const handleBreadcrumbsClick = breadcrumbsItem => {
    if (breadcrumbsItem.path === '') {
      resetSearchMode()
    }
  }

  const key = `docs-view-${docsViewNumber}`

  return (
    <StyledWrapper>
      <StyledBreadcrumbs noLeftPadding={noLeftPadding}>
        <Breadcrumbs
          {...embedded ? {backgroundColor: themeUtil.color('paper')({theme})} : {}}
          onClick={handleBreadcrumbsClick}
        />
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
            path={['/docs/:model/:key/list', '/docs']}
            render={({match}) => (
              <DocsView
                key={key}
                history={history}
                match={match}
                navigationStrategy={navigationStrategy}
                onSearchChange={handleSearchChange}
                emitAction={emitAction}
                openFileDialog={openFileDialog}
                searchMode={searchMode}
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
  navigationStrategy: PropTypes.object,
  embedded: PropTypes.bool,
  theme: PropTypes.object,
  noLeftPadding: PropTypes.bool
}

export default withTheme(DocsBrowser)
