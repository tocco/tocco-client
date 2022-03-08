import PropTypes from 'prop-types'
import React, {useEffect, useReducer, useRef} from 'react'
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
  scrollBehaviour
}) => {
  // eslint-disable-next-line no-unused-vars
  const [docsViewNumber, forceDocsViewUpdate] = useReducer(x => x + 1, 0)

  const searchModeRef = useRef(searchMode)
  searchModeRef.current = searchMode

  useEffect(() => {
    loadBreadcrumbs(path)
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
      <StyledBreadcrumbs noLeftPadding={noLeftPadding}>
        <Breadcrumbs resetSearchMode={resetSearchMode} />
      </StyledBreadcrumbs>
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
  path: PropTypes.string.isRequired,
  searchMode: PropTypes.bool.isRequired,
  navigationStrategy: PropTypes.object,
  noLeftPadding: PropTypes.bool,
  scrollBehaviour: scrollBehaviourPropType
}

export default DocsBrowser
