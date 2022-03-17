import styled from 'styled-components'

import {colorizeText} from '../../utilStyles'
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
    ${props =>
      !props.hasValue &&
      `
      justify-content: center;
      color: ${colorizeText.shade1(props)};
    `}
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
