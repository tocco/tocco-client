import styled from 'styled-components'
import {theme, declareFont} from 'tocco-ui'

export const StyledMarkingWrapper = styled.span`
  ${declareFont()}
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${theme.color('secondaryLight')};
  }
  ${({marked, theme}) => marked && `color: ${theme.colors.secondary};`}
`
