import styled from 'styled-components'
import {StyledButton} from 'tocco-ui/src/Button'
import {
  StyledInputCss,
  StyledEditableWrapperCss
} from 'tocco-ui'

export const StyledTwoStepLogin = styled.div`
  ${StyledButton} {
    width: 100%;

    > span {
      width: 100%;
    }
  }
`
export const StyledTwoStepLoginInput = styled.input`
  && {
    ${StyledInputCss}
  }
`

export const StyledTwoStepLoginInputWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}
  }
`
