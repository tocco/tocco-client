import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Icon, Ball} from 'tocco-ui'
import {withTheme} from 'styled-components'
import {injectIntl, intlShape} from 'react-intl'

import {StyledSplit, AdminSearchGrid, Box, StyledGutter, StyledHeader, StyledSplitWrapper} from './StyedComponents'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'

const SEARCH_FILTER_BUTTON_HEIGHT = 28
const SEARCH_FILTER_PADDING = 15
const MAX_HEIGHT_THRESHOLD = 30
const MAX_SIZE_SEARCH_FILTER = 25

const getGutter = () => () => {
  const gutterEl = document.createElement('div')
  ReactDOM.render(
    <StyledGutter>
      <Icon icon="horizontal-rule"/>
    </StyledGutter>, gutterEl
  )
  return gutterEl
}

const AdminSearchForm = ({resetSearch, theme, intl, searchFilters}) => {
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

  return <AdminSearchGrid>
    <StyledHeader>
      {showExpandSearchFilter && <Ball
        icon={searchFilterExpanded ? 'chevron-up' : 'chevron-down'}
        onClick={() => setSearchFilterExpanded(!searchFilterExpanded)}
      />}
      <Ball
        data-cy="reset-button"
        icon="times"
        onClick={resetSearch}
        title={msg('client.entity-list.reset')}
      />
    </StyledHeader>
    <StyledSplitWrapper ref={splitWrapperEl}>
      <StyledSplit
        direction="vertical"
        gutterSize={39.25}
        sizes={size}
        minSize={[35, 0]}
        gutter={getGutter()}
      >
        <Box>
          <SearchFilterList />
        </Box>
        <Box>
          <BasicSearchFormContainer disableSimpleSearch={true}/>
        </Box>
      </StyledSplit>
    </StyledSplitWrapper>
  </AdminSearchGrid>
}

AdminSearchForm.propTypes = {
  intl: intlShape.isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  resetSearch: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default injectIntl(withTheme(AdminSearchForm))
