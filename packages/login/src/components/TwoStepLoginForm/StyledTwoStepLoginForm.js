import styled from 'styled-components'
import {StyledButton} from 'tocco-ui/src/Button'
import {StyledEditableValue, StyledInputCss} from 'tocco-ui/src/EditableValue/StyledEditableValue'

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
