import styled from 'styled-components'
import {theme} from 'styled-system'

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
        color: ${theme('colors.signal.danger')};
      }
    }
  }
`

export default StyledEditableValue
