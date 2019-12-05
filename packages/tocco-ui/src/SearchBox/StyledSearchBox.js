import styled from 'styled-components'

import {scale, theme} from '../utilStyles'
import {StyledInputCss} from '../EditableValue/StyledEditableValue'
import {StyledStatedValueBox} from '../StatedValue'

export const StyledSearchBox = styled.div`
  && {
    margin-bottom: ${scale.space(0)};
    
    ${StyledStatedValueBox} {
      border: 0;
      width: 82%;
      border-bottom: 1px solid ${theme.color('text')};
      margin: 1rem 0 1rem 1.8rem;
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
