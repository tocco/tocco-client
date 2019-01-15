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
  }
`

export {
  StyledDateAbstractControl,
  StyledDateAbstractInput,
  StyledDateAbstractWrapper
}
