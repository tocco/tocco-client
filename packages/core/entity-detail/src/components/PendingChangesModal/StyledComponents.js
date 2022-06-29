import styled from 'styled-components'
import {scale, StyledButton, theme} from 'tocco-ui'

export const StyledButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  padding-top: ${scale.space(0)};
  background-color: ${theme.color('paper')};
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`
