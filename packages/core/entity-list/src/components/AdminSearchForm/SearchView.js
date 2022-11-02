import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage} from 'react-intl'
import {Ball, BallMenu, Icon, MenuItem, Popover, SidepanelHeader} from 'tocco-ui'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'
import {Box, StyledGutter, StyledSplit, StyledSplitWrapper} from './StyedComponents'

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
  setQueryViewVisible,
  loadSearchAsQuery
}) => {
  const splitWrapperEl = useRef(null)
  const [size, setSize] = useState([MAX_SIZE_SEARCH_FILTER, 100 - MAX_SIZE_SEARCH_FILTER])
  const [searchFilterExpanded, setSearchFilterExpanded] = useState(false)
  const [showExpandSearchFilter, setShowExpandSearchFilter] = useState(false)

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
  const enableQueryView = () => setQueryViewVisible(true)
  const toggleSearchFilterExpansion = () => setSearchFilterExpanded(!searchFilterExpanded)
  const expandBallIcon = searchFilterExpanded ? 'chevron-up' : 'chevron-down'
  const expandBallTitle = searchFilterExpanded ? msg('client.entity-list.contract') : msg('client.entity-list.expand')

  return (
    <>
      <SidepanelHeader>
        <Ball
          data-cy="query-view-button"
          icon="code"
          onClick={enableQueryView}
          title={msg('client.entity-list.query_view')}
        />
        {showExpandSearchFilter && (
          <Ball icon={expandBallIcon} onClick={toggleSearchFilterExpansion} title={expandBallTitle} />
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
      </SidepanelHeader>
      <StyledSplitWrapper ref={splitWrapperEl}>
        <StyledSplit direction="vertical" gutterSize={20} sizes={size} minSize={[90, 0]} gutter={getGutter()}>
          <Box>
            <SearchFilterList />
          </Box>
          <Box>
            <BasicSearchFormContainer />
          </Box>
        </StyledSplit>
      </StyledSplitWrapper>
    </>
  )
}

SearchView.propTypes = {
  msg: PropTypes.func.isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  resetSearch: PropTypes.func.isRequired,
  saveSearchFilter: PropTypes.func.isRequired,
  saveDefaultSearchFilter: PropTypes.func.isRequired,
  resetDefaultSearchFilter: PropTypes.func.isRequired,
  displaySearchFieldsModal: PropTypes.func.isRequired,
  resetSearchFields: PropTypes.func.isRequired,
  searchFormDirty: PropTypes.bool,
  setQueryViewVisible: PropTypes.func.isRequired,
  loadSearchAsQuery: PropTypes.func.isRequired
}

export default SearchView
