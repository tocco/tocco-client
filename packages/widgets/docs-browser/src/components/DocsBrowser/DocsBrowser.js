import PropTypes from 'prop-types'
import {useEffect, useReducer, useRef} from 'react'
import {errorLogging} from 'tocco-app-extensions'
import {scrollBehaviourPropType} from 'tocco-ui'
import {viewPersistor} from 'tocco-util'

import isRootLocation from '../../utils/isRootLocation'
import Breadcrumbs from './Breadcrumbs'
import Content from './Content'
import {StyledWrapper, StyledBreadcrumbs, StyledContent} from './StyledComponents'

const DocsBrowser = ({
  navigate,
  path,
  searchMode,
  navigationStrategy,
  setSearchMode,
  loadBreadcrumbs,
  emitAction,
  openFileDialog,
  noLeftPadding,
  scrollBehaviour,
  listenHistory
}) => {
  // eslint-disable-next-line no-unused-vars
  const [docsViewNumber, forceDocsViewUpdate] = useReducer(x => x + 1, 0)

  const searchModeRef = useRef(searchMode)
  searchModeRef.current = searchMode

  useEffect(() => {
    loadBreadcrumbs(path)
  })

  useEffect(() => {
    return listenHistory((location, action) => {
      if (isRootLocation(path) && searchMode && action === 'POP') {
        // history back on search results
        resetSearchMode()
      }
    })
  })

  const resetSearchMode = () => {
    if (searchModeRef.current) {
      viewPersistor.clearPersistedViews()
      setSearchMode(false)
      loadBreadcrumbs(path)
      forceDocsViewUpdate()
    }
  }

  const handleSearchChange = e => {
    const hasUserChanges = e.query && e.query.hasUserChanges
    if (hasUserChanges) {
      setSearchMode(true)
      navigate('/docs/')
      loadBreadcrumbs(path)
    } else if (isRootLocation(path)) {
      resetSearchMode()
    }
  }

  const key = `docs-view-${docsViewNumber}`

  return (
    <StyledWrapper scrollBehaviour={scrollBehaviour}>
      <errorLogging.ErrorBoundary>
        <StyledBreadcrumbs noLeftPadding={noLeftPadding}>
          <Breadcrumbs resetSearchMode={resetSearchMode} />
        </StyledBreadcrumbs>
      </errorLogging.ErrorBoundary>
      <StyledContent scrollBehaviour={scrollBehaviour}>
        <Content
          navigationStrategy={navigationStrategy}
          handleSearchChange={handleSearchChange}
          emitAction={emitAction}
          openFileDialog={openFileDialog}
          searchMode={searchMode}
          docsKey={key}
        />
      </StyledContent>
    </StyledWrapper>
  )
}

DocsBrowser.propTypes = {
  loadBreadcrumbs: PropTypes.func.isRequired,
  setSearchMode: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  listenHistory: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  searchMode: PropTypes.bool.isRequired,
  navigationStrategy: PropTypes.object,
  noLeftPadding: PropTypes.bool,
  scrollBehaviour: scrollBehaviourPropType
}

export default DocsBrowser
