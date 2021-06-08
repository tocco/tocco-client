/* stylelint-disable no-descending-specificity */
/* stylelint-disable rule-empty-line-before */
import styled from 'styled-components'
import {Button, scale, StyledSpan, theme, StyledMenuItem} from 'tocco-ui'

export const SearchFilterListWrapper = styled.div`
  margin-top: .4rem;
  margin-bottom: .4rem;
`

export const StyledSpanSearchFilter = styled(StyledSpan)`
  width: 90%;
`

export const StyledAddRemoveButton = styled(Button)`
  && {
    background-color: transparent;
    border: 0;
    height: auto;
    border-radius: 0;
    padding: 0 ${scale.space(-2.5)} 0 0;

    &:hover * {
      color: ${({active}) => active ? theme.color('paper') : theme.color('secondary')} !important;
    }
  }
`

export const StyledMenuWrapper = styled.div`
  &&& {
    button {
      background-color: transparent;
      padding: 0 ${scale.space(-1)} 0 0;
    }
    ${/* sc-selector */StyledMenuItem} * {
      color: ${theme.color('text')};

      &:hover * {
        color: ${theme.color('paper')};
      }
    }

    &:hover button {
      color: ${({active}) => active ? theme.color('paper') : theme.color('secondary')};
      cursor: pointer;
    }
  }
`

export const StyleButtonWrapper = styled.div`
  display: flex;
  ${/* sc-selector */StyledMenuWrapper} button,
  ${/* sc-selector */StyledAddRemoveButton} * {
    color: transparent;
  }
`

export const StyledSearchFilterButton = styled.div`
  border-radius: ${theme.radii('medium')};
  display: flex;
  padding: .3rem 0 .3rem 1rem;
  margin-bottom: .2rem;
  background-color: ${({active}) => active && theme.color('secondary')};
  justify-content: flex-end;

  && {
    * {
      color: ${({active}) => active && theme.color('paper')};
    }
  }

  &:hover {
    ${/* sc-selector */StyledSpanSearchFilter},
    ${/* sc-selector */StyledMenuWrapper} button,
    ${/* sc-selector */StyledAddRemoveButton} * {
      color: ${theme.color('paper')};
    }
    background-color: ${({active}) => !active && theme.color('secondaryLight')};
    cursor: pointer;
  }
`

export const StyledMessageWrapper = styled.div`
  padding-left: 8px;
`
