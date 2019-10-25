import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import styled from 'styled-components'

export const StyledSearchFilterButton = styled.div`
  border-radius: 10px;   
  padding: 3px;
  
  ${({active}) => active && `
    background-color: #edf1f5;
  `}
  
  :hover{
    background-color: #DEE6ED;
    cursor: pointer;
  }
`

const SearchFilterButton = ({setActive, active, label}) =>
  <StyledSearchFilterButton active={active} onClick={setActive}>
    <Typography.Span>{label}</Typography.Span>
  </StyledSearchFilterButton>

SearchFilterButton.propTypes = {
  label: PropTypes.string,
  setActive: PropTypes.func,
  active: PropTypes.bool
}

const AdminSearchForm = ({searchFilters, setSearchFilterActive, executeSearch}) => {
  if (!searchFilters) return null

  if (searchFilters.length === 0) {
    return <div style={{paddingLeft: '8px'}}><Typography.I>No Searchfilters available</Typography.I></div>
  }

  return <div>
    {searchFilters
      .sort((a, b) => a.sorting < b.sorting)
      .map(searchFilter =>
        <SearchFilterButton
          key={searchFilter.uniqueId}
          active={searchFilter.active}
          label={searchFilter.label}
          setActive={() => {
            setSearchFilterActive(searchFilter.uniqueId, !searchFilter.active)
            executeSearch()
          }}
        />
      )}
  </div>
}

AdminSearchForm.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  setSearchFilterActive: PropTypes.func,
  executeSearch: PropTypes.func
}

export default AdminSearchForm
