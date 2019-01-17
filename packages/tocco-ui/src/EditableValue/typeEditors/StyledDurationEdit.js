import styled from 'styled-components'

import {spaceScale} from '../../utilStyles'
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
      margin: 0 ${props => spaceScale(props, -1)};
    }

    &:nth-of-type(2) {
      margin-left: ${props => spaceScale(props, -1)};
    }
  }
}
`

export {
  StyledDurationEditWrapper,
  StyledDurationEdit
}
