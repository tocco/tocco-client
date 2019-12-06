import styled from 'styled-components'

import {theme} from '../utilStyles'
import {StyledInputCss} from '../EditableValue/StyledEditableValue'
import {StyledStatedValueBox} from '../StatedValue'

export const StyledSearchBox = styled.div`
  && {
    margin-right: 1rem;
      
    ${StyledStatedValueBox} {
      border: 0;
      width: 100%;
      border-bottom: 1px solid ${theme.color('text')};
      padding-right: .3rem;

      &:focus {
        outline: none;
      }
    }
  }
`

export const StyledSearchBoxInput = styled.input.attrs({
  type: 'search'
})`
  && {
    ${StyledInputCss}
  }
`
