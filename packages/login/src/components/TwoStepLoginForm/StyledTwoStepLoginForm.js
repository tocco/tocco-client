import styled from 'styled-components'
import {StyledButton, StyledInputCss, StyledEditableValue} from 'tocco-ui'

export const StyledTwoStepLogin = styled.div`
  ${StyledButton} {
    width: 100%;
  }

  ${StyledEditableValue} {
    ${StyledInputCss}
    padding-top: .7rem;
    padding-bottom: .7rem;
  }
`
