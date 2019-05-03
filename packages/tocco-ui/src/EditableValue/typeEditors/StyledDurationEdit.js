import styled from 'styled-components'

import {scale} from '../../utilStyles'
import {StyledInputCss} from '../StyledEditableValue'

const StyledDurationEdit = styled.input`
  && {
    ${StyledInputCss}
    flex-grow: 0;
    min-width: 1ch;
  }
`

const StyledDurationEditFocusable = styled.label`
  && {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 0; /* reset bootstrap */

    &:first-child {
      margin-right: ${scale.space(-1)};
    }
  }
`

const StyledDurationEditShadow = styled.span`
  && {
    border: 1px solid transparent;
    left: 0;
    max-width: 100%;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    visibility: hidden;
  }
`

export {
  StyledDurationEditShadow,
  StyledDurationEditFocusable,
  StyledDurationEdit
}
