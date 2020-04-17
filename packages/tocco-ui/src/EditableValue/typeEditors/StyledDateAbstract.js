import styled from 'styled-components'

import {
  StyledEditableWrapperCss,
  StyledInputCss
} from '../StyledEditableValue'

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
  StyledDateAbstractInput,
  StyledDateAbstractWrapper
}
