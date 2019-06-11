import styled from 'styled-components'
import {
  StyledInputCss,
  StyledEditableWrapperCss
} from 'tocco-ui'

export const StyledPasswordInput = styled.input.attrs({
  type: 'password'
})`
  && {
    ${StyledInputCss}
  }
`

export const StyledPasswordInputWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}
  }
`
