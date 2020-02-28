import styled from 'styled-components'

import {
  StyledEditableControlCss,
  StyledEditableWrapperCss,
  StyledInputCss
} from '../StyledEditableValue'

const StyledDateAbstractControl = styled.div`
  && {
    ${StyledEditableControlCss};
    display: ${props => props.hideButton ? 'none' : 'block'};
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
      display: ${props => props.immutable ? 'none' : 'block'};

      &:last-of-type {
        display: ${props => props.immutable ? 'block' : 'none'};
      }
    }
  }
`

export {
  StyledDateAbstractControl,
  StyledDateAbstractInput,
  StyledDateAbstractWrapper
}
