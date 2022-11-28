import styled from 'styled-components'

import {StyledInputCss} from '../EditableValue/StyledEditableValue'
import {StyledStatedValueBox} from '../StatedValue'
import {theme, scale} from '../utilStyles'

export const StyledSearchBox = styled.div`
  && {
    margin-right: ${scale.space(0)};
    margin-top: ${scale.space(-2.8)};
    margin-left: ${scale.space(-2.8)};

    ${StyledStatedValueBox} {
      border: 0;
      width: 100%;
      border-bottom: 1px solid ${theme.color('text')};
      padding-right: 0.3rem;

      /* clears the ‘X’ from Chrome */
      input[type='search']::-webkit-search-decoration,
      input[type='search']::-webkit-search-cancel-button,
      input[type='search']::-webkit-search-results-button,
      input[type='search']::-webkit-search-results-decoration {
        display: none;
      }

      &:focus {
        outline: none;
      }
    }
  }
`

export const StyledSearchBoxInput = styled.input.attrs(props => ({
  type: 'search',
  placeholder: props.placeholder
}))`
  &&&& {
    ${StyledInputCss}
  }
`
