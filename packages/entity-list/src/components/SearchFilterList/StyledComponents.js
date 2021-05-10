/* stylelint-disable no-descending-specificity */
import styled from 'styled-components'
import {Button, scale, StyledSpan, theme} from 'tocco-ui'

export const SearchFilterListWrapper = styled.div`
  margin-top: .4rem;
  margin-bottom: .4rem;
`

export const StyledSpanSearchFilter = styled(StyledSpan)`
  width: 90%;
`

export const StyledButton = styled(Button)`
  && {
    display: none;
    background-color: transparent;
    border: 0;
    flex: 1;
    height: auto;
    border-radius: 0;
    padding: 0 ${scale.space(-1)} 0 0;

    &:hover * {
      color: ${({active}) => active ? theme.color('secondaryLight') : theme.color('secondary')};
    }
  }
`

export const StyledMenuWrapper = styled.div`
  && {
    display: flex;

    button {
      display: none;
      background-color: transparent;
      padding: 0 ${scale.space(-1)} 0 0;
    }

    div * {
      color: ${() => theme.color('text')};
    }

    &:hover button * {
      color: ${({active}) => active ? theme.color('secondaryLight') : theme.color('secondary')};
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

    ${StyledMenuWrapper} {
      button {
        display: flex;
        justify-content: flex-end;
      }
    }
    background-color: ${({active}) => !active && theme.color('secondaryLight')};
    cursor: pointer;

    * {
      color: ${theme.color('paper')};
    }
  }
`

export const StyledMessageWrapper = styled.div`
  padding-left: 8px;
`
