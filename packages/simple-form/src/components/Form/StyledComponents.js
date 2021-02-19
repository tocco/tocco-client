import styled from 'styled-components'
import {StyledButton} from 'tocco-ui'

export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`
