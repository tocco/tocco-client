import React from 'react'
import PropTypes from 'prop-types'
import {MenuItem, BallMenu, Typography} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {searchFilterCompare} from './utils'
import {
  SearchFilterListWrapper,
  StyledSpanSearchFilter,
  StyledButton,
  StyledMenuWrapper,
  StyledSearchFilterButton,
  StyledMessageWrapper
} from './StyledComponents'

const SearchFilterButton = ({
  setActive,
  active,
  label,
  canEdit,
  canDelete,
  primaryKey,
  navigationStrategy,
  deleteSearchFilter
}) =>
  <StyledSearchFilterButton active={active} onClick={() => setActive(!active)}>
    <StyledSpanSearchFilter title={label}>{label}</StyledSpanSearchFilter>
    <StyledButton
      active={active}
      onClick={e => {
        setActive(false)
        e.stopPropagation()
      }}
      icon={active ? 'minus' : 'plus'}
      dense/>
    {(canEdit || canDelete) && <StyledMenuWrapper active={active}>
      <BallMenu buttonProps={{icon: 'ellipsis-h'}}>
        {canEdit && <MenuItem onClick={() => navigationStrategy.openDetail('Search_filter', primaryKey)}>
            <FormattedMessage id="client.entity-list.search.settings.editFilter"/>
        </MenuItem>}
        {canDelete && <MenuItem onClick={deleteSearchFilter}>
          <FormattedMessage id="client.entity-list.search.settings.deleteFilter"/>
        </MenuItem>}
      </BallMenu>
    </StyledMenuWrapper>}
  </StyledSearchFilterButton>

SearchFilterButton.propTypes = {
  label: PropTypes.string,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  primaryKey: PropTypes.string,
  deleteSearchFilter: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.objectOf(PropTypes.func)
}

const AdminSearchForm = props => {
  const {searchFilters, setSearchFilterActive, executeSearch, navigationStrategy, deleteSearchFilter} = props
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
          primaryKey={searchFilter.key}
          active={searchFilter.active}
          label={searchFilter.label}
          setActive={exclusive => {
            setSearchFilterActive(searchFilter.uniqueId, !searchFilter.active, exclusive)
            executeSearch()
          }}
          canEdit={searchFilter.editAllowed}
          canDelete={searchFilter.deleteAllowed}
          navigationStrategy={navigationStrategy}
          deleteSearchFilter={() => deleteSearchFilter(searchFilter.key)}
        />
      )
    }
  </SearchFilterListWrapper>
}

AdminSearchForm.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  setSearchFilterActive: PropTypes.func.isRequired,
  executeSearch: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.objectOf(PropTypes.func),
  deleteSearchFilter: PropTypes.func.isRequired
}

export default AdminSearchForm
