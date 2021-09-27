import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Icon, Ball, BallMenu, MenuItem, Popover} from 'tocco-ui'
import {withTheme} from 'styled-components'
import {FormattedMessage, injectIntl} from 'react-intl'

import {
  StyledSplit,
  AdminSearchGrid,
  Box,
  StyledGutter,
  StyledHeader,
  StyledSplitWrapper,
  StyledToggleCollapseButton,
  StyledPlaceHolder
} from './StyedComponents'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'

const SEARCH_FILTER_BUTTON_HEIGHT = 28
const SEARCH_FILTER_PADDING = 10
const MAX_HEIGHT_THRESHOLD = 30
const MAX_SIZE_SEARCH_FILTER = 25

const getGutter = () => () => {
  const gutterEl = document.createElement('div')
  ReactDOM.render(
    <StyledGutter tabIndex={0}>
      <Icon icon="horizontal-rule"/>
    </StyledGutter>, gutterEl
  )
  return gutterEl
}

const AdminSearchForm = ({
  resetSearch,
  intl,
  searchFilters,
  saveSearchFilter,
  saveDefaultSearchFilter,
  resetDefaultSearchFilter,
  displaySearchFieldsModal,
  resetSearchFields,
  searchFormDirty,
  isCollapsed,
  toggleCollapse
}) => {
  const splitWrapperEl = useRef(null)
  const [size, setSize] = useState([MAX_SIZE_SEARCH_FILTER, 100 - MAX_SIZE_SEARCH_FILTER])
  const [searchFilterExpanded, setSearchFilterExpanded] = useState(false)
  const [showExpandSearchFilter, setShowExpandSearchFilter] = useState(false)

  const msg = id => intl.formatMessage({id})

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

  const isSingleSearchFilterActive = searchFilters !== null && searchFilters.filter(s => s.active).length === 1

  return <>
    <AdminSearchGrid isCollapsed={isCollapsed}>
      <StyledHeader>
        <StyledToggleCollapseButton icon={'chevron-left'} isCollapsed={isCollapsed} onClick={toggleCollapse}/>
        {showExpandSearchFilter && <Ball
          icon={searchFilterExpanded ? 'chevron-up' : 'chevron-down'}
          onClick={() => setSearchFilterExpanded(!searchFilterExpanded)}
          title={searchFilterExpanded ? msg('client.entity-list.contract') : msg('client.entity-list.expand')}
        />}
        <Ball
          data-cy="reset-button"
          icon="times"
          onClick={resetSearch}
          title={msg('client.entity-list.reset')}
        />
        <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
          <MenuItem disabled={!isSingleSearchFilterActive} onClick={saveDefaultSearchFilter}>
            <Popover content={!isSingleSearchFilterActive
            && <FormattedMessage id="client.entity-list.search.settings.defaultFilter.save.info"/>
            }>
              <FormattedMessage id="client.entity-list.search.settings.defaultFilter.save"/>
            </Popover>
          </MenuItem>
          <MenuItem onClick={resetDefaultSearchFilter}>
            <FormattedMessage id="client.entity-list.search.settings.defaultFilter.reset"/>
          </MenuItem>
          <MenuItem onClick={saveSearchFilter} disabled={!searchFormDirty}>
            <FormattedMessage id="client.entity-list.search.settings.saveAsFilter"/>
          </MenuItem>
          <MenuItem onClick={displaySearchFieldsModal}>
            <FormattedMessage id="client.entity-list.search.settings.searchForm.edit"/>
          </MenuItem>
          <MenuItem onClick={resetSearchFields}>
            <FormattedMessage id="client.entity-list.search.settings.searchForm.reset"/>
          </MenuItem>
        </BallMenu>
      </StyledHeader>
      <StyledSplitWrapper ref={splitWrapperEl}>
        <StyledSplit
          direction="vertical"
          gutterSize={20}
          sizes={size}
          minSize={[90, 0]}
          gutter={getGutter()}
        >
          <Box>
            <SearchFilterList/>
          </Box>
          <Box>
            <BasicSearchFormContainer disableSimpleSearch={true}/>
          </Box>
        </StyledSplit>
      </StyledSplitWrapper>
    </AdminSearchGrid>
    <StyledPlaceHolder onClick={toggleCollapse} isCollapsed={isCollapsed}>
      <StyledToggleCollapseButton icon={'chevron-right'} isCollapsed={isCollapsed}/>
    </StyledPlaceHolder>
  </>
}

AdminSearchForm.propTypes = {
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
  toggleCollapse: PropTypes.func.isRequired
}

export default injectIntl(withTheme(AdminSearchForm))
