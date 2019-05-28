import styled from 'styled-components'

import {
  StyledEditableControlCss,
  StyledEditableWrapperCss,
  StyledInputCss
} from '../StyledEditableValue'

const StyledDateAbstractControl = styled.div`
  && {
    ${StyledEditableControlCss}
  ${props => props.hideButton && `
    display: none;
  `}
  }
`

const StyledDateAbstractInput = styled.input`
  &&& {
    ${StyledInputCss}
  }
`

const StyledDateAbstractWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}

    input {
      display: ${props => props.readOnly ? 'none' : 'block'}

      &:last-of-type {
        display: ${props => props.readOnly ? 'block' : 'none'}
      }
    }
  }
`

export {
  StyledDateAbstractControl,
  StyledDateAbstractInput,
  StyledDateAbstractWrapper
}
