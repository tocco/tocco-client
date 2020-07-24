import styled, {css} from 'styled-components'
import _get from 'lodash/get'

import {
  declareFont,
  generateDisabledShade,
  theme
} from '../utilStyles'

const StyledEditableWrapperCss = css`
  align-items: center;
  cursor: ${props => props.immutable ? 'not-allowed' : 'default'};
  display: flex;
`

const StyledEditableWrapper = styled.label`
  &&& {
    margin: 0; /* reset Bootstrap and Ext JS */
    padding: 0; /* reset Ext JS */
    ${StyledEditableWrapperCss}
  }
`

const StyledInputCss = css`
  background-color: transparent;
  border: 0;
  cursor: ${props => props.immutable ? 'not-allowed' : 'default'};
  flex-grow: 1;
  min-height: 2.6rem;
  min-width: 0;
  outline: 0;
  padding: 0;
  ${props => declareFont({
    color: props.immutable ? generateDisabledShade(_get(props.theme, 'colors.text')) : theme.color('text')
  })}
  &::-ms-clear {
    display: none;
  }

  &::-webkit-clear-button {
    display: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &[type='number'] {
    appearance: textfield;
  }
`

const StyledEditableControlCss = css`
  display: flex;
  align-items: center;
`

const StyledEditableControl = styled.div`
  &&& {
    ${StyledEditableControlCss}
  }
`

export const StyledEditableValue = styled.span`
  && {
    //textarea
    textarea {
      resize: vertical; // react-textarea-autosize consumes resize property
      max-height: 25rem; // react-textarea-autosize respects max-height property
    }

    //url
    [type='url'] + .input-group-addon > a {
      color: inherit;  // reset bootstrap default
    }

    //url
    [type='tel'] + .input-group-addon > a {
      color: inherit;  // reset bootstrap default
    }

    //html edit
    .quill {
      .ql-toolbar {
        border-top-left-radius: .27rem;
        border-top-right-radius: .27rem;
      }

      .ql-container {
        border-bottom-left-radius: .27rem;
        border-bottom-right-radius: .27rem;
        background-color: #fff;
      }

      .ql-container.ql-disabled {
        border-top-left-radius: .27rem;
        border-top-right-radius: .27rem;

        .ql-editor {
          cursor: not-allowed;
        }
      }
    }

    //date
    .date-edit {
      .input-group-addon {
        cursor: pointer;
      }

      input {
        z-index: 0;
      }

      &.disabled {
        input {
          cursor: not-allowed;
        }
      }

      .right-addon {
        position: relative;
      }

      .right-addon input {
        padding-right: 30px;
      }

      .reset {
        position: absolute;
        padding-right: 10px;
        padding-top: 5px;
        right: 0;
        color: #999;
        font-size: 18px;
        font-style: normal;
        cursor: pointer;
      }

      .reset:hover {
        color: ${theme.color('signal.danger.text')};
      }
    }
  }
`

export {
  StyledEditableControl,
  StyledEditableControlCss,
  StyledEditableValue as default,
  StyledEditableWrapper,
  StyledEditableWrapperCss,
  StyledInputCss
}
