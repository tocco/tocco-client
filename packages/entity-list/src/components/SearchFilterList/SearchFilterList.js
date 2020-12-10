import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {searchFilterCompare} from './utils'
import {
  SearchFilterListWrapper,
  StyledSpanSearchFilter,
  StyledButton,
  StyledSearchFilterButton,
  StyledMessageWrapper
} from './StyledComponents'

const SearchFilterButton = ({setActive, active, label}) =>
  <StyledSearchFilterButton active={active} onClick={() => setActive(!active)}>
    <StyledSpanSearchFilter title={label}>{label}</StyledSpanSearchFilter>
    <StyledButton
      active={active}
      onClick={e => {
        setActive(false)
        e.stopPropagation()
      }}
      icon={active ? 'minus' : 'plus'}
      dense />
  </StyledSearchFilterButton>

SearchFilterButton.propTypes = {
  label: PropTypes.string,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.bool
}

const AdminSearchForm = ({searchFilters, setSearchFilterActive, executeSearch}) => {
  if (!searchFilters) {
    return null
  }

  if (searchFilters.length === 0) {
    return <StyledMessageWrapper>
      <Typography.I>
        <FormattedMessage id="client.entity-list.noSearchFilters"/>
      </Typography.I>
    </StyledMessageWrapper>
  }

  return <SearchFilterListWrapper>
    {[...searchFilters]
      .sort(searchFilterCompare)
      .map(searchFilter =>
        <SearchFilterButton
          key={searchFilter.uniqueId}
          active={searchFilter.active}
          label={searchFilter.label}
          setActive={exclusive => {
            setSearchFilterActive(searchFilter.uniqueId, !searchFilter.active, exclusive)
            executeSearch()
          }}
        />
      )
    }
  </SearchFilterListWrapper>
}

AdminSearchForm.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  setSearchFilterActive: PropTypes.func.isRequired,
  executeSearch: PropTypes.func.isRequired
}

export default AdminSearchForm
