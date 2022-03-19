import styled from 'styled-components'
import {scale, StyledButton, theme} from 'tocco-ui'

export const StyledStickyButton = styled.div`
  position: sticky;
  bottom: 0;
  padding-top: ${scale.space(0)};
  background-color: ${theme.color('paper')};
  z-index: 1;
  display: flex;
  justify-content: flex-end;

  ${/* sc-selector */ StyledButton}:last-child {
    margin-right: 0;
  }
`
