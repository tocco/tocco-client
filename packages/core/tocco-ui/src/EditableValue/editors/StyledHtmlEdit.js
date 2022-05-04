import styled from 'styled-components'

import {declareTypograhpy} from '../../Typography'

export const StyledHtmlEdit = styled.div`
  && {
    button {
      margin-bottom: 0;
    }

    .ql-editor {
      ${props => declareTypograhpy(props, 'quill')}

      &[contenteditable='false'] * {
        cursor: not-allowed;
      }
    }
  }
`
