import styled from 'styled-components'
import {
  StyledInputCss,
  StyledEditableWrapperCss
} from 'tocco-ui'
import {StyledButton} from 'tocco-ui/src/Button'
import {StyledButtonGroup} from 'tocco-ui/src/ButtonGroup'

export const StyledLoginFormInput = styled.input`
  @keyframes onAutoFillStart { from {} }

  && {
    transition: background-color 50000s, color 50000s, filter 50000s;
     &:-webkit-autofill {
      animation-duration: 50000s;
      animation-name: onAutoFillStart;
     }
  }
  
  ${StyledInputCss}
`

export const StyledLoginFormInputWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}
  }
`

export const StyledLoginFormWrapper = styled.div`
  ${StyledButtonGroup} {
    width: auto;

    ${StyledButton} {
      flex-grow: 1;

      > span {
        width: 100%;
      }
    }
  }
`
