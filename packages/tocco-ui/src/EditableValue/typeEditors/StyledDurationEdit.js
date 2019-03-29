import styled from 'styled-components'

import {scale} from '../../utilStyles'
import {StyledSpan} from '../../Typography'
import {
  StyledEditableWrapper,
  StyledInputCss
} from '../StyledEditableValue'

const StyledDurationEdit = styled.input.attrs({
  type: 'number'
})`
  && {
    ${StyledInputCss}
    width: 100%;
  }
`

const StyledDurationEditWrapper = styled.div`
&& {
  align-items: center;
  display: flex;
  min-width: 20rem;

  > ${StyledEditableWrapper} {
    flex-grow: 1;
  }

  > ${StyledSpan} {
    &:nth-of-type(1) {
      margin: 0 ${scale.space(-1)};
    }

    &:nth-of-type(2) {
      margin-left: ${scale.space(-1)};
    }
  }
}
`

export {
  StyledDurationEditWrapper,
  StyledDurationEdit
}
