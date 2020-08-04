import styled from 'styled-components'

import {theme, scale} from '../utilStyles'
import {StyledInputCss} from '../EditableValue/StyledEditableValue'
import {StyledStatedValueBox} from '../StatedValue'

export const StyledSearchBox = styled.div`
  && {
    margin-right: ${scale.space(0)};
    margin-top: ${scale.space(-2.8)};
    margin-left: ${scale.space(-2.8)};

    ${StyledStatedValueBox} {
      border: 0;
      width: 100%;
      border-bottom: 1px solid ${theme.color('text')};
      padding-right: .3rem;

      input[type='search']::-webkit-search-decoration {
        display: none;
      }

      &:focus {
        outline: none;
      }
    }
  }
`

export const StyledSearchBoxInput = styled.input.attrs(props => ({
  type: 'search'
}))`
  && {
    ${StyledInputCss}
  }
`
