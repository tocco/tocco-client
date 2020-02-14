import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Button, theme, StyledSpan} from 'tocco-ui'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'

const SearchFilterListWrapper = styled.div`
  margin-top: .4rem;
  margin-bottom: .4rem;
`

const StyledSpanSearchFilter = styled(StyledSpan)`
  && {display: flex;}
  width: 100%;
`

const StyledButton = styled(Button)`
  &&& {
    display: none;
    background-color: transparent;
    margin-left: auto;
    border: 0;
    padding: 0;

     &:hover * {
      color: ${theme.color('secondary')}
    }
  }
`

export const StyledSearchFilterButton = styled.div`
  border-radius: ${theme.radii('medium')};
  display: flex;
  padding: .3rem 1rem;
  margin-bottom: .2rem;
  background-color: ${({active}) => active && theme.color('secondary')};

  && {
    * {color: ${({active}) => active && theme.color('paper')};}
    ${({active}) => active && `
      ${StyledButton} {
        display: block;
      }
      `
    }
  }

  :hover {
    ${StyledButton} {
      display: flex;
    }

    background-color: ${theme.color('secondaryLight')};
    * {color: ${theme.color('paper')};}
    cursor: pointer;
  }
`

const SearchFilterButton = ({setActive, active, label}) =>
  <StyledSearchFilterButton active={active} onClick={() => setActive(!active)}>
    <StyledSpanSearchFilter>{label}
      <StyledButton
        onClick={e => {
          setActive(false)
          e.stopPropagation()
        }}
        icon="plus"
        dense />
    </StyledSpanSearchFilter>
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
      .sort((a, b) => a.defaultFilter ? -1 : a.sorting > b.sorting)
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
