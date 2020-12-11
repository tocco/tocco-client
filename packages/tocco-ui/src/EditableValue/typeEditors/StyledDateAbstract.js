import styled from 'styled-components'

import {
  StyledEditableWrapperCss,
  StyledInputCss
} from '../StyledEditableValue'

export const StyledDateAbstractInput = styled.input`
  &&& {
    ${StyledInputCss}
  }
`

export const StyledDateAbstractOuterWrapper = styled.div`
  outline: ${({immutable}) => immutable ? 0 : 'initial'};
`

export const StyledDateAbstractWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}

    input {
      display: ${({immutable}) => immutable ? 'none' : 'block'};

      &:last-of-type {
        display: ${({immutable}) => immutable ? 'block' : 'none'};
      }
    }
  }
`
