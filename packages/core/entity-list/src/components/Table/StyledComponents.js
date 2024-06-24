import styled from 'styled-components'
import {themeSelector, declareFont, scale, StyledButton, colorizeBorder} from 'tocco-ui'

export const StyledMarkingWrapper = styled.span`
  ${declareFont()}
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;

  &:hover {
    color: ${themeSelector.color('secondaryLight')};
  }
  ${({marked, theme}) => marked && `color: ${theme.colors.secondary};`}
`

export const StyledButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  padding-top: ${scale.space(0)};
  background-color: ${themeSelector.color('paper')};
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`

export const StyledEditableValueWrapper = styled.div`
  border: 1px solid ${colorizeBorder.shade1};
  padding-right: ${scale.space(-1)};
  padding-left: ${scale.space(-1)};
`
