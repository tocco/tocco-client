import styled from 'styled-components'
import {StyledButton, theme} from 'tocco-ui'

export const StyledButtonsWrapper = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  background-color: ${theme.color('paper')};
  z-index: 2; // higher than StyledIndicatorsContainerWrapper

  ${StyledButton} {
    margin-right: 0;
  }
`
