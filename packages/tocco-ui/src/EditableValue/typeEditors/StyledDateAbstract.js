import styled from 'styled-components'

import {
  StyledEditableControlCss,
  StyledEditableWrapperCss,
  StyledInputCss
} from '../StyledEditableValue'

const StyledDateAbstractControl = styled.div.attrs({
  'data-clear': true
})`
  && {
  ${props => props.hideButton && `
    display: none;
  `}
    ${StyledEditableControlCss}
  }
`

const StyledDateAbstractInput = styled.input.attrs({
  type: 'text',
  'data-input': true
})`
  &&& {
    ${StyledInputCss}
  }
`

const StyledDateAbstractWrapper = styled.div.attrs({
  'data-wrap': true
})`
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
