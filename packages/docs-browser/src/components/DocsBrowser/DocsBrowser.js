import React, {useEffect, useReducer} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, useLocation} from 'react-router-dom'
import {withTheme} from 'styled-components'
import {theme as themeUtil} from 'tocco-ui'

import DocsView from '../DocsView'
import DocumentView from '../DocumentView'
import Breadcrumbs from '../../containers/BreadcrumbsContainer'
import {StyledWrapper, StyledBreadcrumbs, StyledContent} from './StyledComponents'

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
      <StyledBreadcrumbs noLeftPadding={noLeftPadding}>
        <Breadcrumbs {...embedded ? {backgroundColor: themeUtil.color('paper')({theme})} : {}}/>
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
  navigationStrategy: PropTypes.object,
  embedded: PropTypes.bool,
  theme: PropTypes.object,
  noLeftPadding: PropTypes.bool
}

export default withTheme(DocsBrowser)
