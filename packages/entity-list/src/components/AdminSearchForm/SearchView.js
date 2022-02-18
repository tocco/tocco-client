import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage} from 'react-intl'
import {Ball, BallMenu, Icon, MenuItem, Popover} from 'tocco-ui'
import {react as customHooks} from 'tocco-util'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'
import {
  AdminSearchGrid,
  Box,
  StyledGutter,
  StyledHeader,
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
            <BasicSearchFormContainer/>
          </Box>
        </StyledSplit>
      </StyledSplitWrapper>
    </AdminSearchGrid>
  )
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

export default SearchView
