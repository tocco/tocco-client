import styled from 'styled-components'
import {
  StyledInputCss,
  StyledEditableWrapperCss
} from 'tocco-ui'
import {StyledButton} from 'tocco-ui/src/Button'
import {StyledButtonGroup} from 'tocco-ui/src/ButtonGroup'

export const StyledLoginFormInput = styled.input`
  && {
    ${StyledInputCss}
  }
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
