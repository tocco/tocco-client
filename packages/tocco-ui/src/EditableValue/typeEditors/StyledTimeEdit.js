import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledTimeEdit = styled.input.attrs({
  type: 'time'
})`
  && {
    ${StyledInputCss}
    &[type=time] {
      &::-ms-clear {
        display: none;
      }
      &::-webkit-clear-button {
        display: none;
      }
      &::-webkit-inner-spin-button {
        display: none;
      }
    }
  }
`

export default StyledTimeEdit
