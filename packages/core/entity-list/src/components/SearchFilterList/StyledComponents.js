/* stylelint-disable no-descending-specificity */
/* stylelint-disable rule-empty-line-before */
import styled, {css} from 'styled-components'
import {Button, scale, StyledSpan, theme, StyledItemLabel, isTouchDevice} from 'tocco-ui'

export const SearchFilterListWrapper = styled.div`
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
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
      color: ${({active}) => (active ? theme.color('paper') : theme.color('secondary'))} !important;
    }
  }
`

export const StyledMenuWrapper = styled.div`
  &&& {
    button {
      background-color: transparent;
      padding: 0 ${scale.space(-1)} 0 0;
    }

    &:hover button {
      color: ${({active}) => (active ? theme.color('paper') : theme.color('secondary'))};
      cursor: pointer;
    }
  }
`

export const StyleButtonWrapper = styled.div`
  display: flex;
  ${/* sc-selector */ StyledMenuWrapper} button,
  ${/* sc-selector */ StyledAddRemoveButton} * {
    color: transparent;
  }
`

export const StyledSearchFilterButton = styled.div`
  border-radius: ${theme.radii('medium')};
  display: flex;
  padding: 0.3rem 0 0.3rem 1rem;
  margin-bottom: 0.2rem;
  background-color: ${({active}) => active && theme.color('secondary')};
  justify-content: flex-end;

  && {
    *:not(${/* sc-selector */ StyledItemLabel}) {
      color: ${({active}) => active && theme.color('paper')};
    }
  }
  ${!isTouchDevice &&
  css`
    &:hover {
      ${/* sc-selector */ StyledSpanSearchFilter},
      ${/* sc-selector */ StyledMenuWrapper} button,
      ${/* sc-selector */ StyledAddRemoveButton} * {
        color: ${theme.color('paper')};
      }
      background-color: ${({active}) => !active && theme.color('secondaryLight')};
      cursor: pointer;
    }
  `}
  ${isTouchDevice &&
  css`
    ${/* sc-selector */ StyledSpanSearchFilter},
    ${/* sc-selector */ StyledMenuWrapper} button,
    ${/* sc-selector */ StyledAddRemoveButton} * {
      color: ${theme.color('secondary')};
    }
  `}
`

export const StyledMessageWrapper = styled.div`
  padding-left: 8px;
`
