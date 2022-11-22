import PropTypes from 'prop-types'
import React, {Suspense, useEffect, useMemo, useReducer, useRef, useState} from 'react'
import {searchFormTypePropTypes, selectionStylePropType} from 'tocco-entity-list/src/main'
import {Icon, LoadMask, scrollBehaviourPropType} from 'tocco-ui'
import {viewPersistor} from 'tocco-util'

import isRootLocation from '../../utils/isRootLocation'
import Action from '../Action'
import FileInput from '../FileInput'
import {StyledContentWrapper, StyledIconWrapper} from './StyledComponents'

export const getParent = params => {
  if (params && params.model) {
    const model = params.model.charAt(0).toUpperCase() + params.model.slice(1)
    const key = params.key
    const fullKey = `${model}/${key}`
    return {
      model: 'Docs_list_item',
      key: fullKey // e.g. "Domain/118"
    }
  }
  return null
}

export const getTql = domainTypes =>
  Array.isArray(domainTypes) && domainTypes.length > 0
    ? `exists(relDomain_type where IN(unique_id, ${domainTypes.map(type => `"${type}"`).join(',')}))`
    : null

export const getFormName = (parent, keys) => {
  if (parent) {
    return 'Docs_list_item'
  }

  return keys ? 'Root_docs_list_item_specific' : 'Root_docs_list_item'
}

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
    selection: inputSelection,
    selectionFilterFn,
    getCustomLocation,
    disableViewPersistor,
    getListFormName,
    domainDetailFormName,
    folderDetailFormName,
    showActions,
    scrollBehaviour,
    sortable,
    searchMode,
    openResource,
    searchFormCollapsed,
    locale,
    changeSelection,
    changeSearchFormCollapsed,
    params,
    navigate,
    path
  } = props
  // eslint-disable-next-line no-unused-vars
  const [entityListNumber, forceEntityListUpdate] = useReducer(x => x + 1, 0)

  const entityListKey = `entity-list-${entityListNumber}`

  const [selection, setSelection] = useState([])
  const actualSelection = inputSelection || selection

  const parent = useMemo(() => getParent(params), [params])

  const keys = !parent && rootNodes ? rootNodes.map(node => `${node.entityName}/${node.key}`) : null
  const formName = useMemo(
    () => (getListFormName ? getListFormName(parent, keys) : getFormName(parent, keys)),
    [parent, keys, getListFormName]
  )

  const mounted = useRef(false)
  const searchModeRef = useRef(searchMode)
  const pathRef = useRef(path)

  searchModeRef.current = searchMode
  pathRef.current = path

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  })

  useEffect(() => {
    changeListParent(parent)
    /**
     * Reset selection when changing page so that an action is only applied on one page.
     * Do not call `changeSelection` since this is not an active user action.
     * So far we use the `onSelectionChange` for choosing a document and selecting e.g. folders for remote fields.
     * For those use cases we want to keep the selection over multiple pages.
     */
    setSelection([])
  }, [parent, changeListParent])

  const onSelectChange = updatedSelection => {
    setSelection(updatedSelection)
    changeSelection(updatedSelection)
  }

  const saveSearchStore = () => {
    if (!viewPersistor.viewInfoSelector('search').store) {
      // persist search store to allow a "go back to search"
      const searchStore = viewPersistor.viewInfoSelector(entityListKey).store
      viewPersistor.persistViewInfo('search', {store: searchStore})
    }
    /**
     * Force entity-list to mount a complete new component. This will create a new redux store.
     * Otherwise "searchStore" will get updated in behind and does not keep original state.
     */
    forceEntityListUpdate()
  }

  const handleRowClick = ({id}) => {
    /**
     * Workaround for potential EntityList Bug:
     *   onRowClick event is only attached once initially and does not get proper updates
     *
     * - props.searchMode and props.path are potentially outdated at time of invocation
     * - using those values in refs will return always latest values
     */
    if (searchMode && isRootLocation(path)) {
      saveSearchStore()
    }

    const [model, key] = id.split('/')
    const location = getCustomLocation ? getCustomLocation(model, key) : getDefaultLocation(model, key)

    if (location) {
      if (openResource && model === 'Resource') {
        openResource(location)
      } else {
        navigate(location)
      }
    } else {
      onSelectChange([id])
    }
  }

  const tql = !parent && !keys ? getTql(domainTypes) : null

  const handleUploadDocument = function (_definition, _selection, _parent, _params, _config, onSuccess, onError) {
    const directory = false
    openFileDialog(directory, onSuccess, onError)
  }

  const handleUploadDirectory = function (_definition, _selection, _parent, _params, _config, onSuccess, onError) {
    const directory = true
    openFileDialog(directory, onSuccess, onError)
  }

  const handleSearch = e => {
    if (mounted.current) {
      const hasUserChanges = e.query && e.query.hasUserChanges
      if (hasUserChanges) {
        saveSearchStore()
      }

      onSearchChange(e)
    }
  }

  const handleStoreCreation = store => {
    if (!disableViewPersistor) {
      viewPersistor.persistViewInfo(entityListKey, {store})
    }
  }

  const getStore = () => {
    if (disableViewPersistor) {
      return undefined
    }

    return isRootLocation(path) ? viewPersistor.viewInfoSelector('search').store : null
  }

  const store = getStore()

  return (
    <>
      <Suspense fallback={<LoadMask />}>
        <LazyListApp
          key={entityListKey}
          id="documents"
          entityName="Docs_list_item"
          formName={formName}
          searchListFormName="Search_docs_list_item"
          limit={limit || 25}
          onRowClick={handleRowClick}
          searchFormPosition="left"
          searchFormType={searchFormType || 'admin'}
          parent={parent}
          onSearchChange={handleSearch}
          store={store}
          onStoreCreate={handleStoreCreation}
          cellRenderers={{
            'dms-label-with-icon': (rowData, column, cellRenderer) => (
              <StyledContentWrapper>
                <StyledIconWrapper>
                  <Icon icon={rowData.icon} />
                </StyledIconWrapper>
                <span>{cellRenderer(column.children[0])}</span>
              </StyledContentWrapper>
            ),
            'dms-actions': (rowData, column, cellRenderer) => (
              <StyledContentWrapper>
                {column.children
                  .filter(c => !c.dmsEntityModel || c.dmsEntityModel === rowData.type)
                  .map(c => cellRenderer(c))}
              </StyledContentWrapper>
            )
          }}
          emitAction={emitAction}
          actionAppComponent={Action}
          contextParams={{
            detailFormNames: {
              Domain: domainDetailFormName,
              Folder: folderDetailFormName
            }
          }}
          customActions={{
            'upload-document': handleUploadDocument,
            'upload-directory': handleUploadDirectory
          }}
          navigationStrategy={navigationStrategy}
          tql={tql}
          keys={keys}
          selectionStyle={selectionStyle || 'multi_explicit'}
          onSelectChange={onSelectChange}
          selection={actualSelection}
          selectionFilterFn={selectionFilterFn}
          showActions={showActions}
          sortable={sortable}
          searchFormCollapsed={searchFormCollapsed}
          scrollBehaviour={scrollBehaviour}
          onSearchFormCollapsedChange={changeSearchFormCollapsed}
          locale={locale}
        />
      </Suspense>
      <FileInput />
    </>
  )
}

DocsView.propTypes = {
  navigationStrategy: PropTypes.object,
  domainTypes: PropTypes.arrayOf(PropTypes.string),
  rootNodes: PropTypes.arrayOf(
    PropTypes.shape({
      entityName: PropTypes.string,
      key: PropTypes.string
    })
  ),
  path: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  changeListParent: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  limit: PropTypes.number,
  searchFormType: searchFormTypePropTypes,
  selectionStyle: selectionStylePropType,
  getCustomLocation: PropTypes.func,
  disableViewPersistor: PropTypes.bool,
  getListFormName: PropTypes.func,
  domainDetailFormName: PropTypes.string,
  folderDetailFormName: PropTypes.string,
  showActions: PropTypes.bool,
  sortable: PropTypes.bool,
  searchMode: PropTypes.bool,
  openResource: PropTypes.func,
  searchFormCollapsed: PropTypes.bool,
  scrollBehaviour: scrollBehaviourPropType,
  locale: PropTypes.string,
  changeSelection: PropTypes.func.isRequired,
  changeSearchFormCollapsed: PropTypes.func.isRequired,
  selection: PropTypes.arrayOf(PropTypes.string),
  selectionFilterFn: PropTypes.func
}

export default DocsView
