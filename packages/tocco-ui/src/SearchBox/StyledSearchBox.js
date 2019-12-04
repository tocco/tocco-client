import styled from 'styled-components'

import {scale, theme} from '../utilStyles'
import {StyledInputCss} from '../EditableValue/StyledEditableValue'
import {StyledStatedValueBox} from '../StatedValue'

const StyledSearchBoxForm = styled.form`
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

const StyledSearchBoxInput = styled.input.attrs({
  type: 'search'
})`
  && {
    ${StyledInputCss}
  }
`

export {
  StyledSearchBoxForm,
  StyledSearchBoxInput
}
