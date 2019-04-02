import styled, {css} from 'styled-components'
import _get from 'lodash/get'

import {
  declareFocus,
  declareFont,
  scale,
  shadeColor,
  theme
} from '../utilStyles'

const StyledEditableWrapperCss = css`
  align-items: center;
  background-color: ${props => props.readOnly
    ? shadeColor(_get(props.theme, 'colors.paper'), 1)
    : theme.color('paper')};
  border: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  border-radius: ${theme.radii('regular')};
  cursor: ${props => props.readOnly ? 'not-allowed' : 'default'};
  display: flex;
  padding: ${scale.space(-2)} ${scale.space(-1)};
  ${props => declareFocus(props)}
`

const StyledEditableWrapper = styled.div`
  && {
    ${StyledEditableWrapperCss}
  }
`

const StyledInputCss = css`
  background-color: transparent;
  border: 0;
  cursor: inherit;
  flex-grow: 1;
  min-height: 2.6rem;
  min-width: 0;
  outline: 0;
  padding: 0;
  ${declareFont()}
  &::-ms-clear {
    display: none;
  }
  &::-webkit-clear-button {
    display: none;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`

const StyledEditableControlCss = css`
  > a,
  > button,
  > span > button {
    margin-left: ${scale.space(-2)};
    margin-right: -${scale.space(-2)};
    min-width: 2.6rem;
  }
`

const StyledEditableControl = styled.div`
  && {
    ${StyledEditableControlCss}
  }
`

const StyledEditableValue = styled.span`
  && {
    //textarea
    textarea {
      resize: vertical; // react-textarea-autosize consumes resize property
      max-height: 25rem; // react-textarea-autosize respects max-height property
    }

    //url
    [ type = url ] + .input-group-addon > a {
      color: inherit;  // reset bootstrap default
    }

    //url
    [ type = tel ] + .input-group-addon > a {
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
        background-color: #eee;

        .ql-editor {
          cursor: not-allowed;
        }
      }
    }

    //date
    .date-edit {
      input[ readonly ] {
        background-color: #fff;
      }

      .input-group-addon {
        cursor: pointer;
      }

      input {
        z-index: 0;
      }

      &.disabled {
        input {
          background-color: #eee;
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
