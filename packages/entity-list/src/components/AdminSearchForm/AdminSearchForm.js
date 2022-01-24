import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage, injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'
import {Ball, BallMenu, EditableValue, FormattedValue, Icon, MenuItem, Popover, StatedValue} from 'tocco-ui'
import {react as customHooks} from 'tocco-util'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'
import {
  AdminSearchGrid,
  Box,
  StyledGutter,
  StyledHeader,
  StyledPlaceHolder,
  StyledQueryBox,
  StyledSplit,
  StyledSplitWrapper,
  StyledToggleCollapseButton
} from './StyedComponents'

const SEARCH_FILTER_BUTTON_HEIGHT = 28
const SEARCH_FILTER_PADDING = 10
const MAX_HEIGHT_THRESHOLD = 30
const MAX_SIZE_SEARCH_FILTER = 25

const getGutter = () => () => {
  const gutterEl = document.createElement('div')
  ReactDOM.render(
    <StyledGutter tabIndex={0}>
      <Icon icon="horizontal-rule" />
    </StyledGutter>,
    gutterEl
  )
  return gutterEl
}

const AdminSearchForm = props => {
  const {intl, isCollapsed, toggleCollapse, queryViewVisible} = props
  const msg = id => intl.formatMessage({id})

  return (
    <>
      {!queryViewVisible && <SearchView msg={msg} {...props} />}
      {queryViewVisible && <QueryView msg={msg} {...props} />}
      <StyledPlaceHolder onClick={toggleCollapse} isCollapsed={isCollapsed}>
        <StyledToggleCollapseButton icon={'chevron-right'} isCollapsed={isCollapsed} />
      </StyledPlaceHolder>
    </>
  )
}

const SearchView = ({
  resetSearch,
  msg,
  searchFilters,
  saveSearchFilter,
  saveDefaultSearchFilter,
  resetDefaultSearchFilter,
  displaySearchFieldsModal,
  resetSearchFields,
  searchFormDirty,
  isCollapsed,
  toggleCollapse,
  initialized,
  setQueryViewVisible,
  loadSearchAsQuery
}) => {
  const splitWrapperEl = useRef(null)
  const searchFormEl = useRef(null)
  const [size, setSize] = useState([MAX_SIZE_SEARCH_FILTER, 100 - MAX_SIZE_SEARCH_FILTER])
  const [searchFilterExpanded, setSearchFilterExpanded] = useState(false)
  const [showExpandSearchFilter, setShowExpandSearchFilter] = useState(false)

  customHooks.useAutofocus(searchFormEl, [initialized])

  useEffect(() => {
    const searchFilterHeight = searchFilters
      ? searchFilters.length * SEARCH_FILTER_BUTTON_HEIGHT + SEARCH_FILTER_PADDING
      : SEARCH_FILTER_BUTTON_HEIGHT
    const splitWrapperHeight = splitWrapperEl.current.clientHeight
    const searchFilterHeightPercentage = Math.ceil(100 / (splitWrapperHeight / searchFilterHeight))

    if (!searchFilterExpanded && searchFilterHeightPercentage > MAX_HEIGHT_THRESHOLD) {
      setShowExpandSearchFilter(true)
      setSize([MAX_SIZE_SEARCH_FILTER, 100 - MAX_SIZE_SEARCH_FILTER])
    } else {
      setSize([searchFilterHeightPercentage, 100 - searchFilterHeightPercentage])
    }
  }, [searchFilters, searchFilterExpanded])

  const isSingleSearchFilterActive = searchFilters?.filter(s => s.active).length === 1

  const openAsQuery = () => {
    setQueryViewVisible(true)
    loadSearchAsQuery()
  }

  return (
    <AdminSearchGrid isCollapsed={isCollapsed}>
      <StyledHeader>
        <StyledToggleCollapseButton icon={'chevron-left'} isCollapsed={isCollapsed} onClick={toggleCollapse} />
        <Ball
          data-cy="query-view-button"
          icon="code"
          onClick={() => setQueryViewVisible(true)}
          title={msg('client.entity-list.query_view')}
        />
        {showExpandSearchFilter && (
          <Ball
            icon={searchFilterExpanded ? 'chevron-up' : 'chevron-down'}
            onClick={() => setSearchFilterExpanded(!searchFilterExpanded)}
            title={searchFilterExpanded ? msg('client.entity-list.contract') : msg('client.entity-list.expand')}
          />
        )}
        <Ball data-cy="reset-button" icon="times" onClick={resetSearch} title={msg('client.entity-list.reset')} />
        <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
          <MenuItem disabled={!isSingleSearchFilterActive} onClick={saveDefaultSearchFilter}>
            <Popover
              content={
                !isSingleSearchFilterActive && (
                  <FormattedMessage id="client.entity-list.search.settings.defaultFilter.save.info" />
                )
              }
            >
              <FormattedMessage id="client.entity-list.search.settings.defaultFilter.save" />
            </Popover>
          </MenuItem>
          <MenuItem onClick={resetDefaultSearchFilter}>
            <FormattedMessage id="client.entity-list.search.settings.defaultFilter.reset" />
          </MenuItem>
          <MenuItem onClick={saveSearchFilter} disabled={!searchFormDirty}>
            <FormattedMessage id="client.entity-list.search.settings.saveAsFilter" />
          </MenuItem>
          <MenuItem onClick={displaySearchFieldsModal}>
            <FormattedMessage id="client.entity-list.search.settings.searchForm.edit" />
          </MenuItem>
          <MenuItem onClick={resetSearchFields}>
            <FormattedMessage id="client.entity-list.search.settings.searchForm.reset" />
          </MenuItem>
          <MenuItem onClick={openAsQuery}>
            <FormattedMessage id="client.entity-list.query.search.open" />
          </MenuItem>
        </BallMenu>
      </StyledHeader>
      <StyledSplitWrapper ref={splitWrapperEl}>
        <StyledSplit direction="vertical" gutterSize={20} sizes={size} minSize={[90, 0]} gutter={getGutter()}>
          <Box>
            <SearchFilterList />
          </Box>
          <Box ref={searchFormEl}>
            <BasicSearchFormContainer disableSimpleSearch={true} />
          </Box>
        </StyledSplit>
      </StyledSplitWrapper>
    </AdminSearchGrid>
  )
}

const QueryView = ({
  isCollapsed,
  setQueryViewVisible,
  msg,
  entityModel,
  query,
  queryError,
  loadSearchAsQuery,
  saveQueryAsFilter,
  setQuery,
  runQuery
}) => {
  const codeEditorEvents = {
    onChange: setQuery
  }
  const codeEditorOptions = {
    mode: 'tql'
  }
  const queryExists = !!query && query.trim().length > 0
  return (
    <AdminSearchGrid isCollapsed={isCollapsed}>
      <StyledHeader>
        <Ball
          data-cy="search-view-button"
          icon="filter"
          onClick={() => setQueryViewVisible(false)}
          title={msg('client.entity-list.search_view')}
        />
        <Ball
          data-cy="search-button"
          icon="search"
          onClick={runQuery}
          title={msg('client.entity-list.query.search')}
          disabled={!queryExists || (queryError && Object.entries(queryError).length !== 0)}
        />
        <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
          <MenuItem onClick={loadSearchAsQuery}>
            <FormattedMessage id="client.entity-list.query.search.open" />
          </MenuItem>
          <MenuItem
            onClick={saveQueryAsFilter}
            disabled={!queryExists || (queryError && Object.entries(queryError).length !== 0)}
          >
            <FormattedMessage id="client.entity-list.query.filter.save" />
          </MenuItem>
        </BallMenu>
      </StyledHeader>
      <StyledQueryBox>
        <StatedValue hasValue={true} label={msg('client.entity-list.query.entity-model')}>
          <FormattedValue type="string" value={entityModel} />
        </StatedValue>
        <StatedValue
          error={queryError}
          touched={queryExists}
          fixLabel={true}
          hasValue={queryExists}
          label={msg('client.entity-list.query.editor')}
        >
          <EditableValue type="code" value={query} options={codeEditorOptions} events={codeEditorEvents} />
        </StatedValue>
      </StyledQueryBox>
    </AdminSearchGrid>
  )
}

AdminSearchForm.propTypes = {
  initialized: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  resetSearch: PropTypes.func.isRequired,
  theme: PropTypes.object,
  saveSearchFilter: PropTypes.func.isRequired,
  saveDefaultSearchFilter: PropTypes.func.isRequired,
  resetDefaultSearchFilter: PropTypes.func.isRequired,
  displaySearchFieldsModal: PropTypes.func.isRequired,
  resetSearchFields: PropTypes.func.isRequired,
  searchFormDirty: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func.isRequired,
  entityModel: PropTypes.string.isRequired,
  queryViewVisible: PropTypes.bool.isRequired,
  setQueryViewVisible: PropTypes.func.isRequired,
  query: PropTypes.string,
  queryError: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
  loadSearchAsQuery: PropTypes.func.isRequired,
  saveQueryAsFilter: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired
}

SearchView.propTypes = {
  initialized: PropTypes.bool.isRequired,
  msg: PropTypes.func.isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  resetSearch: PropTypes.func.isRequired,
  saveSearchFilter: PropTypes.func.isRequired,
  saveDefaultSearchFilter: PropTypes.func.isRequired,
  resetDefaultSearchFilter: PropTypes.func.isRequired,
  displaySearchFieldsModal: PropTypes.func.isRequired,
  resetSearchFields: PropTypes.func.isRequired,
  searchFormDirty: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func.isRequired,
  setQueryViewVisible: PropTypes.func.isRequired,
  loadSearchAsQuery: PropTypes.func.isRequired
}

QueryView.propTypes = {
  msg: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
  setQueryViewVisible: PropTypes.func.isRequired,
  entityModel: PropTypes.string.isRequired,
  query: PropTypes.string,
  queryError: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
  loadSearchAsQuery: PropTypes.func.isRequired,
  saveQueryAsFilter: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired
}

export default injectIntl(withTheme(AdminSearchForm))
