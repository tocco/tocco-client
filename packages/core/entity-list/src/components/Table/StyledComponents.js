import styled from 'styled-components'
import {themeSelector, declareFont} from 'tocco-ui'

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
