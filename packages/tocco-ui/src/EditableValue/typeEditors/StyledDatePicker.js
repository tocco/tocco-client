import styled from 'styled-components'

import {StyledEditableWrapperCss, StyledInputCss} from '../StyledEditableValue'

export const StyledDatePickerInput = styled.input`
  &&& {
    ${StyledInputCss}
    margin: 0;
  }
`

export const StyledDatePickerValue = styled.div`
  && {
    ${StyledInputCss}
    display: flex;
    align-items: center;
  }
`

export const StyledDatePickerOuterWrapper = styled.div`
  outline: ${({immutable}) => (immutable ? 0 : 'initial')};
`

export const StyledDatePickerWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}

    input {
      display: ${({immutable}) => (immutable ? 'none' : 'block')};

      &:last-of-type {
        display: ${({immutable}) => (immutable ? 'block' : 'none')};
      }
    }
  }
`
