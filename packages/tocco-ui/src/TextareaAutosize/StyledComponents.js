import styled, {css} from 'styled-components'

import {StyledInputCss} from '../EditableValue/StyledEditableValue'

const StyledText = css`
  ${StyledInputCss}
  width: 100%;
  grid-area: 1 / 1 / 2 / 2;
  max-height: 25rem;
  box-sizing: border-box;
`

export const StyledSizeWrapper = styled.div`
  display: grid;
  width: 100%;

  &:after {
    content: attr(data-replicated-value) ' ';
    white-space: pre-wrap;
    word-break: break-all;
    visibility: hidden;
    ${StyledText}

    /* prevent scrollbar on Firefox */
    padding-right: 15px;
  }
`

export const StyledTextarea = styled.textarea`
  ${StyledText}
  resize: none;
  margin: 0;

  &:empty {
    height: 2em;
  }
`
