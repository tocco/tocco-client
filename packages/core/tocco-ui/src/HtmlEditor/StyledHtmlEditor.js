import styled from 'styled-components'

import {declareTypograhpy} from '../Typography'

export const StyledHtmlEditor = styled.div`
  && {
    .ck-editor {
      --ck-border-radius: 0.27rem;
      ${props => declareTypograhpy(props, 'ckeditor')}

      .ck.ck-list__item .ck-button.ck-fontsize-option .ck-button__label {
        line-height: 1;
      }

      .ck-editor__editable {
        min-height: 100px;
      }
    }
  }
`
