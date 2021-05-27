import React, {useEffect, useState, Suspense, useMemo, useRef} from 'react'
import PropTypes from 'prop-types'
import {viewPersistor} from 'tocco-util'
import {Icon, LoadMask} from 'tocco-ui'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/util/searchFormTypes'
import {selectionStylePropType} from 'tocco-entity-list/src/util/selectionStyles'

import Action from '../Action'
import FileInput from '../FileInput'
import {StyledContentWrapper, StyledIconWrapper} from './StyledComponents'

const ICONS = {
  Domain: 'globe',
  Folder: 'folder',
  Resource: 'file'
}

export const getParent = match => {
  if (match.params && match.params.model) {
    const model = match.params.model.charAt(0).toUpperCase() + match.params.model.slice(1)
    const key = match.params.key
    const fullKey = `${model}/${key}`
    return {
      model: 'Docs_list_item',
      key: fullKey // e.g. "Domain/118"
    }
  }
  return null
}

export const getTql = domainTypes =>
  Array.isArray(domainTypes)
    && domainTypes.length > 0
    ? `exists(relDomain_type where IN(unique_id, ${domainTypes.map(type => `"${type}"`).join(',')}))`
    : null

export const getFormName = (parent, keys) => parent
  ? 'Docs_list_item'
  : keys
    ? 'Root_docs_list_item_specific'
    : 'Root_docs_list_item'

export const getDefaultLocation = (model, key) => {
  switch (model) {
    case 'Domain':
      return `/docs/domain/${key}/list`
    case 'Folder':
      return `/docs/folder/${key}/list`
    case 'Resource':
      return `/docs/doc/${key}/detail`
    default:
      throw new Error(`Unexpected model: ${model}`)
  }
}

const LazyListApp = React.lazy(() => import('./LazyListApp'))

const DocsView = props => {
  const {
    storeKey,
    history,
    match,
    domainTypes,
    rootNodes,
    navigationStrategy,
    changeListParent,
    onSearchChange,
    emitAction,
    openFileDialog,
    limit,
    searchFormType,
    selectionStyle,
    getCustomLocation,
    disableViewPersistor,
    formName,
    showActions,
    sortable,
    searchMode,
    openResource
  } = props

  const [selection, setSelection] = useState([])
  const parent = useMemo(() => getParent(match), [match.params])

  const keys = !parent && rootNodes ? rootNodes.map(node => `${node.entityName}/${node.key}`) : null
  const listFormName = useMemo(() => formName === null ? getFormName(parent, keys) : formName, [match.params])

  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  })

  useEffect(() => {
    changeListParent(parent)
    setSelection([])
  }, [parent])

  const handleRowClick = ({id}) => {
    if (history.location.pathname === '/docs/search') {
      // persist search store to allow a "go back to search"
      const searchStore = viewPersistor.viewInfoSelector(storeKey).store
      viewPersistor.persistViewInfo('search', {store: searchStore})
    }

    const [model, key] = id.split('/')
    const location = getCustomLocation ? getCustomLocation(model, key) : getDefaultLocation(model, key)

    if (location) {
      if (openResource && model === 'Resource') {
        openResource(location)
      } else {
        history.push(location)
      }
    }
  }

  const tql = !parent && !keys ? getTql(domainTypes) : null

  const handleUploadDocument = function* (definition, selection, parent, params, config, onSuccess, onError) {
    const directory = false
    openFileDialog(history.location.pathname, directory, onSuccess, onError)
  }

  const handleUploadDirectory = function* (definition, selection, parent, params, config, onSuccess, onError) {
    const directory = true
    openFileDialog(history.location.pathname, directory, onSuccess, onError)
  }

  const handleSearch = e => {
    if (mounted.current) {
      onSearchChange(e)
    }
  }

  const store = disableViewPersistor ? undefined : searchMode ? viewPersistor.viewInfoSelector('search').store : null

  return (
    <>
      <Suspense fallback={<LoadMask />}>
        <LazyListApp
          id="documents"
          entityName="Docs_list_item"
          formName={listFormName}
          limit={limit || 25}
          onRowClick={handleRowClick}
          searchFormPosition="left"
          searchFormType={searchFormType || 'admin'}
          parent={parent}
          onSearchChange={handleSearch}
          store={store}
          onStoreCreate={store => {
            if (!disableViewPersistor) {
              viewPersistor.persistViewInfo(storeKey, {store})
            }
          }}
          cellRenderers={{
            'dms-label-with-icon': (rowData, column, cellRenderer) => (
              <StyledContentWrapper>
                <StyledIconWrapper>
                  <Icon icon={ICONS[rowData.type]} />
                </StyledIconWrapper>
                <span>{cellRenderer(column.children[0])}</span>
              </StyledContentWrapper>
            )
          }}
          emitAction={emitAction}
          actionAppComponent={Action}
          contextParams={{
            history
          }}
          customActions={{
            'upload-document': handleUploadDocument,
            'upload-directory': handleUploadDirectory
          }}
          navigationStrategy={navigationStrategy}
          tql={tql}
          keys={keys}
          selectionStyle={selectionStyle || 'multi_explicit'}
          onSelectChange={setSelection}
          selection={selection}
          showActions={showActions}
          sortable={sortable}
        />
      </Suspense>
      <FileInput />
    </>
  )
}

DocsView.propTypes = {
  storeKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  navigationStrategy: PropTypes.object,
  domainTypes: PropTypes.arrayOf(PropTypes.string),
  rootNodes: PropTypes.arrayOf(PropTypes.shape({
    entityName: PropTypes.string,
    key: PropTypes.string
  })),
  changeListParent: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  limit: PropTypes.number,
  searchFormType: searchFormTypePropTypes,
  selectionStyle: selectionStylePropType,
  getCustomLocation: PropTypes.func,
  disableViewPersistor: PropTypes.bool,
  formName: PropTypes.string,
  showActions: PropTypes.bool,
  sortable: PropTypes.bool,
  searchMode: PropTypes.bool,
  openResource: PropTypes.func
}

export default DocsView
