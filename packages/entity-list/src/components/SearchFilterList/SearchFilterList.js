/* stylelint-disable no-descending-specificity */
import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Button, theme, StyledSpan, scale} from 'tocco-ui'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'

const SearchFilterListWrapper = styled.div`
  margin-top: .4rem;
  margin-bottom: .4rem;
`

const StyledSpanSearchFilter = styled(StyledSpan)`
  width: 90%;
`

const StyledButton = styled(Button)`
  && {
    display: none;
    background-color: transparent;
    border: 0;
    flex: 1;
    height: auto;
    border-radius: 0;
    padding: 0 ${scale.space(-1)} 0 0;

    &:hover * {
      color: ${theme.color('secondary')};
    }
  }
`

export const StyledSearchFilterButton = styled.div`
  border-radius: ${theme.radii('medium')};
  display: flex;
  padding: .3rem 0 .3rem 1rem;
  margin-bottom: .2rem;
  background-color: ${({active}) => active && theme.color('secondary')};
  align-items: stretch;
  justify-content: space-between;

  && {
    * {
      color: ${({active}) => active && theme.color('paper')};
    }
  }

  :hover {
    ${StyledButton} {
      display: flex;
      justify-content: flex-end;
    }
    background-color: ${theme.color('secondaryLight')};

    * {
      color: ${theme.color('paper')};
    }
    cursor: pointer;
  }
`

const SearchFilterButton = ({setActive, active, label}) =>
  <StyledSearchFilterButton active={active} onClick={() => setActive(!active)}>
    <StyledSpanSearchFilter title={label}>{label}</StyledSpanSearchFilter>
    <StyledButton
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
  if (!searchFilters) return null

  if (searchFilters.length === 0) {
    return <div style={{paddingLeft: '8px'}}><Typography.I>
      <FormattedMessage id="client.entity-list.noSearchFilters"/>
    </Typography.I></div>
  }

  return <SearchFilterListWrapper>
    {searchFilters
      .sort((a, b) => a.defaultFilter ? -1 : a.sorting - b.sorting)
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
      )}
  </SearchFilterListWrapper>
}

AdminSearchForm.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.object),
  setSearchFilterActive: PropTypes.func.isRequired,
  executeSearch: PropTypes.func.isRequired
}

export default AdminSearchForm
